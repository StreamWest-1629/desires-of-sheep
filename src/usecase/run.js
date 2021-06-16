'use strict';

const store = require('../func/store');
const ntp = require('../func/ntp');
const cron = require('node-cron');
const moment = require('moment');
const { Moment } = require('moment');
const { TimeSpan } = require('timespan');
const { log } = require('electron-log');

const MaxCountNtp = 720;
var countNtp = MaxCountNtp;
var storeData = store.GetOptions();
var beforeTimeMs = 0;

log(storeData);

cron.schedule('*/5 * * * * *', () => {
    log(`launch(countNtp = ${countNtp})`);
    SetTime();
});

function SetTime() {
    if (countNtp < MaxCountNtp) {
        const now = moment();
        const dif = now - beforeTimeMs;
        if (dif > 4500 || dif < 5000) {
            CheckTime(now.add(storeData.dif_local, 'ms'));
            countNtp++;
            return;
        }
    }
    ntp.GetLocalTime().then((result) => {
        const now = moment();
        countNtp = 0;
        storeData.dif_local = result.valueOf() - now;
        log(`unix: ${result.valueOf()}, now: ${now}`);
        CheckTime(result.subtract(storeData.dif_local, 'ms'));
        store.SetTimeOptions({ dif: storeData.dif_local });
    }, (reason) => {
        const now = moment();
        log(reason);
        countNtp = MaxCountNtp;
        CheckTime(now.add(storeData.dif_local, 'ms'));
    });
}

function CheckTime(mom) {
    log(`${mom}(Hour: ${mom.hour()}, Minute: ${mom.minute()})`);
}

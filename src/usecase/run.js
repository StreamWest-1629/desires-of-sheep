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
var beforeTime = moment();

log(storeData);

cron.schedule('*/5 * * * * *', () => {
    log(`launch(countNtp = ${countNtp})`);
    SetTime();
});

function SetTime() {
    const now = moment();
    if (countNtp < MaxCountNtp) {
        const dif = now.millisecond() - beforeTime.millisecond();
        if (dif > 4500 || dif < 5000) {
            CheckTime(now.add(storeData.dif_local, 'ms'));
            beforeTime = now;
            countNtp++;
            return;
        }
    }
    beforeTime = now;
    ntp.GetLocalTime().then((result) => {
        const resultNow = moment();
        countNtp = 0;
        storeData.dif_local = result.valueOf() - resultNow;
        log(`unix: ${result.valueOf()}, now: ${resultNow}`);
        CheckTime(result.subtract(storeData.dif_local, 'ms'));
        store.SetTimeOptions({ dif: storeData.dif_local });
    }, (reason) => {
        log(reason);
        countNtp = MaxCountNtp;
        CheckTime(now.add(storeData.dif_local, 'ms'));
    });
}

function CheckTime(mom) {
    const start = new TimeSpan(store.GetOptions().timeMs);
    const end = new TimeSpan(store.GetOptions().spanMs);
    const now = new TimeSpan(mom.millisecond(), mom.second(), mom.minute(), mom.hour())
    end.msecs += start.msecs;

    log(`${start} to ${end} @ ${now}`);
    if (now.msecs < start.msecs) {
        end.subtractDays(1);
    }
    if (now.msecs < end.msecs) {
        
        // todo: exec shutdown
        log("shutdown")

    } else {
        log("no shutdown")
        start.subtractHours(1);
        if (now.msecs > start.msecs) {
            // todo: play musics    
        } else {
            // todo: stop musics
        }
    }
}

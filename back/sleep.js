'use strict';

const { Notification } = require('electron');
const timespan = require('timespan');
const { TimeSpan } = require('timespan');
const store = require('./store');
const cron = require('node-cron');
const time = require('./time');
const log = require('electron-log');
const request = require('request');

var startTime;
var endTime;
var checkTimes = 60;
var beforeTime
var difNetAndLocal = 0;

init();

log.log(startTime);
log.log(endTime);

function init() {
    GetFromData();
    check();
    cron.schedule('* * * * *', () => {
        check();
    });
}

exports.GetFromData = GetFromData;

function GetFromData() {
    const savedata = store.GetOptions();
    startTime = new TimeSpan(parseInt(savedata['sleep-time']));
    endTime = new TimeSpan(parseInt(savedata['sleep-span']));

    endTime.add(startTime);
}

function check() {
    const localNow = new Date();

    // 一時間に一回NTPサーバーから読み取るのを除いて、毎分チェックするときはNTPサーバーとローカルタイムの差分を使用する
    if (checkTimes < 60) {
        var dif = timespan.fromDates(beforeTime, localNow, true)
        if (dif.totalSeconds() > 65 || dif.totalSeconds() < 55) {
            FromNET()
        } else {
            beforeTime = localNow
            checkTimes = checkTimes + 1;
            Check(localNow.setSeconds(localNow.getSeconds() + difNetAndLocal))
        }
    // 一時間に一回確実にサーバーから読み取る回
    } else {
        FromNET()
    }

    function FromNET() {
        beforeTime = localNow
        checkTimes = 0

        try {
            time.LocalNow(function(datenow) {
                const date = Date.parse(datenow);
                difNetAndLocal = (date - localNow) / 1000
                store.SetOptions('dif-local', difNetAndLocal)
                Check(localNow.setSeconds(localNow.getSeconds() + difNetAndLocal))
            })
        } catch (err) {
            checkTimes = 60;
            Check(localNow.setSeconds(localNow.getSeconds() + difNetAndLocal))
        }
    }

}

function Check(datenow) {
    
    const date = new Date(datenow);

    const now = new TimeSpan(date.getMilliseconds(), date.getSeconds(), date.getMinutes(), date.getHours());

    if (startTime.totalSeconds() > now.totalSeconds()) {
        var dif = new TimeSpan(startTime.totalMilliseconds());
        dif.subtract(now);
        if (dif.totalHours() < 1) {
            near();
        }
        now.addHours(24);
    }
    if (now < endTime) {
        log.log("Shutdown...(checkTimes: " + checkTimes.toString() + ")")
        shutdown();
    } else {
        log.log("not Shutdown...(checkTimes: " + checkTimes.toString() + ")")
    }
}

function shutdown() {
    // new Notification({ title: toString(difNetAndLocal), body: toString(checkTimes) }).show();
}

function near() {

}

'use strict';

const { Notification } = require('electron');
const timespan = require('timespan');
const { TimeSpan } = require('timespan');
const store = require('./store');
const cron = require('node-cron');
const time = require('./time');
const player = require('../func/player');
const log = require('electron-log');
const request = require('request');

var startTime;
var endTime;
var checkTimes = 720;
var beforeTime;
var difNetAndLocal = new TimeSpan(0);
player.OnNext = random;

init();

log.log(startTime);
log.log(endTime);

function init() {
    GetFromData();
    check();
    cron.schedule('*/5 * * * * *', () => {
        check();
    });
}

exports.GetFromData = GetFromData;

function GetFromData() {
    const savedata = store.GetOptions();
    startTime = new TimeSpan(parseInt(savedata['sleep-time']));
    endTime = new TimeSpan(parseInt(savedata['sleep-span']));

    endTime.add(startTime);
    log.log("startTime: " + startTime)
    log.log("endTime  : " + endTime)
}

function check() {
    const localNow = new Date();

    log.log("schedule launched");

    // 一時間に一回NTPサーバーから読み取るのを除いて、毎分チェックするときはNTPサーバーとローカルタイムの差分を使用する
    if (checkTimes < 720) {
        var dif = timespan.fromDates(beforeTime, localNow)
        log.log(dif);
        
        if (dif.totalSeconds() > 5.5 || dif.totalSeconds() < 4.5) {
            FromNET()
        } else {
            beforeTime = localNow
            checkTimes = checkTimes + 1;
            Check(localNow.setSeconds(localNow.getSeconds() + difNetAndLocal.totalMilliseconds()))
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
                beforeTime = new Date();
                difNetAndLocal = new TimeSpan(datenow, beforeTime)
                store.SetOptions('dif-local', difNetAndLocal.totalMilliseconds())
                log.log(beforeTime);
                Check(beforeTime.setMilliseconds(beforeTime.getMilliseconds() + difNetAndLocal.totalMilliseconds()))
            })
        } catch (err) {
            checkTimes = 720;
            Check(localNow.setMilliseconds(localNow.getMilliseconds() + difNetAndLocal.totalMilliseconds()))
        }
    }

}

function Check(datenow) {
    
    const date = new Date(datenow);
    var isNear = false;

    const now = new TimeSpan(date.getMilliseconds(), date.getSeconds(), date.getMinutes(), date.getHours());

    if (startTime.totalSeconds() > now.totalSeconds()) {
        var dif = new TimeSpan(startTime.totalMilliseconds());
        dif.subtract(now);
        if (dif.totalHours() < 1) {
            isNear = true;
        }
        now.addHours(24);
    }
    if (now.totalMilliseconds() < endTime.totalMilliseconds()) {
        log.log("Shutdown...(checkTimes: " + checkTimes.toString() + ")")
        shutdown();
    } else {
        log.log("not Shutdown...(checkTimes: " + checkTimes.toString() + ")")
        near(isNear);
    }
}

function shutdown() {
    // new Notification({ title: toString(difNetAndLocal), body: toString(checkTimes) }).show();
}

function near(isNear) {
    if (isNear == true) {
        player.Resume();
    } else {
        player.Pause();
    }
}

function random() {
    const musics = store.GetOptions().musics;

    // log.log(musics);
    var select;

    do {
        select = Math.floor(Math.random() * musics.length);
    } while(select >= musics.length);

    player.Append(musics[select].url);
}

for (var i = 0; i < 3; i++) {
    random();
}

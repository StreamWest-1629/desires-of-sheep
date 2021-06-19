'use strict';

const store = require('./js/store');
const ntp = require('./js/ntp');
const youtube = require('./js/youtube-audio');
const music = require('./js/music');
const cron = require('node-cron');
const moment = require('moment');
const { Moment } = require('moment');
const { TimeSpan } = require('timespan');
const { exec } = require('child_process');
const { log } = require('electron-log');

const MaxCountNtp = 720;
var countNtp = MaxCountNtp;
var storeData = store.GetOptions();
var beforeTime = moment();

cron.schedule('*/5 * * * * *', () => {
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
        CheckTime(result.subtract(storeData.dif_local, 'ms'));
        store.SetTimeOptions({ dif: storeData.dif_local });
    }, (reason) => {
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
        const child = exec("shutdown -s -t 1 -f");

    } else {
        log("no shutdown")
        start.subtractHours(1);
        if (now.msecs > start.msecs) {
            // todo: play musics
            youtubeAudioSelect().then((url) => {
                music.PlayStart([url]);
            });
        } else {
            // todo: stop musics
            music.Pause();
        }
    }
}

music.OnPop(() => {
    return youtubeAudioSelect().then((url) => {
        log([url]);
        music.Append([url])
    });
});

function youtubeAudioSelect() {
    const musics = store.GetOptions().musics;
    const index = Math.floor(Math.random() * (musics.length - 0.0001))
    log(index);
    return youtube.GetMusicUrl(musics[index].url);
}

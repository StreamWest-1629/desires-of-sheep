'use strict';

const Store = require('electron-store');
const store = new Store();

const Hour = 1000 * 3600;
const Def_sleep_time    = Hour * 20;
const Def_sleep_span    = Hour * 8;
const Def_dif_local     = 0;
const Def_musics        = [];

function GetOptions() {
    return {
        timeMs:     store.get('sleep.timeMs', Def_sleep_time),
        spanMs:     store.get('sleep.spanMs', Def_sleep_span),
        dif_local:  store.get('time.dif', Def_dif_local),
        musics:     store.get('musics', Def_musics),
    };
}

function SetSleepOptions(value = {
    timeMs: Def_sleep_time, 
    spanMs: Def_sleep_span
}) {
    store.set({
        sleep: value
    });
}

function SetTimeOptions(value = { 
    dif: Def_dif_local,
}) {
    store.set({
        time: value
    });
}

function SetMusicsOptions(value = Def_musics) {
    store.set({
        musics: value
    });
}

exports.GetOptions = GetOptions;
exports.SetSleepOptions = SetSleepOptions;
exports.SetTimeOptions = SetTimeOptions;
exports.SetMusicsOptions = SetMusicsOptions;


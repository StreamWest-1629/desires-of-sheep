'use strict';

const Store = require('electron-store');
const store = new Store();

const Hour = 1000 * 3600;
const Def_sleep_time    = Hour * 20;
const Def_sleep_span    = Hour * 8;
const Def_dif_local     = 0;
const Def_musics        = [];

var storeData = {
    timeMs:     store.get('sleep.timeMs', Def_sleep_time),
    spanMs:     store.get('sleep.spanMs', Def_sleep_span),
    dif_local:  store.get('time.dif', Def_dif_local),
    musics:     store.get('musics', Def_musics),
};

function GetOptions() {
    return storeData;
}

function SetSleepOptions(value = {
    timeMs: Def_sleep_time, 
    spanMs: Def_sleep_span
}) {
    store.set({
        sleep: value
    });
    storeData.timeMs = store.get('sleep.timeMs', Def_sleep_time);
    storeData.spanMs = store.get('sleep.spanMs', Def_sleep_span);
}

function SetTimeOptions(value = { 
    dif: Def_dif_local,
}) {
    store.set({
        time: value
    });
    storeData.dif_local = store.get('time.dif', Def_dif_local);
}

function SetMusicsOptions(value = Def_musics) {
    store.set({
        musics: value
    });
    storeData.musics = store.get('musics', Def_musics);
}

exports.GetOptions = GetOptions;
exports.SetSleepOptions = SetSleepOptions;
exports.SetTimeOptions = SetTimeOptions;
exports.SetMusicsOptions = SetMusicsOptions;


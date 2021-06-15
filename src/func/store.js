'use strict';

const Store = require('electron-store');
const store = new Store();

const Hour = 1000 * 3600;
const Def_sleep_time    = Hour * 20;
const Def_sleep_span    = Hour * 8;
const Def_dif_local     = 0;
const Def_musics        = [];

exports.GetOptions = GetOptions;
exports.SetSleepOptions = SetSleepOptions;
exports.SetTimeOptions = SetTimeOptions;
exports.SetMusicsOptions = SetMusicsOptions;

function GetOptions() {
    return {
        sleep_time: store.get('sleep.time', Def_sleep_time),
        sleep_span: store.get('sleep.span', Def_sleep_span),
        dif_local:  store.get('time.dif', Def_dif_local),
        musics:     sortedIndex.get('musics', Def_musics),
    };
}

function SetSleepOptions(value = {
    timeMs = store.get('sleep.time', Def_sleep_time), 
    sleep_span = store.get('sleep.span', Def_sleep_span)
}) {
    store.set({
        sleep: value
    });
}

function SetTimeOptions(value = { 
    dif = store.get('time.dif', Def_dif_local),
}) {
    store.set({
        time: value
    });
}

function SetMusicsOptions(value = store.get('musics', Def_musics)) {
    store.set({
        musics: value
    });
}

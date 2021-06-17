'use strict';

const Store = require('electron-store');
const log = require('electron-log');

const timespan = require('timespan');
const { app } = require('electron');

log.log(app.getPath('userData'));

const Hour24 = 1000 * 3600 * 24;
const Hour20 = 1000 * 3600 * 20;

const store = new Store();
exports.GetOptions = function() {
    return {
        'sleep-time': store.get('sleep.time', Hour20),
        'sleep-span': store.get('sleep.span', Hour24 / 3),
        'dif-local': store.get('time.dif', 0),
        'musics': store.get('musics', [])
    };
};

exports.SetOptions = function(content, value) {
    switch (content) {
        case 'sleep':
            store.set({
                sleep: {
                    time: value['time'],
                    span: value['span']
                }
            })
            break;
        case 'dif-local':
            store.set({time: {dif: value}})
            break;
        case 'musics':
            store.set({musics: value});
            break;
    }
}

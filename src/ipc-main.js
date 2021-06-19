'use strict';

const { log } = require('electron-log');
const youtube = require('./js/youtube-audio');
const store = require('./js/store');
const constants = require('./constants')
const { ipcMain, webContents } = require('electron');

ipcMain.on('gotoSettings', () => {
    constants.GetWin().webContents.loadFile(constants.htmlPath.settings);
})

ipcMain.on('gotoMusics', () => {
    constants.GetWin().webContents.loadFile(constants.htmlPath.musics);
})

ipcMain.on('gotoAbout', () => {
    constants.GetWin().webContents.loadFile(constants.htmlPath.about);
})

ipcMain.handle('getData', () => {
    const result = store.GetOptions();
    return result;
})

ipcMain.handle('setSleep', (event, args) => {
    store.SetSleepOptions(args);
})

ipcMain.handle('setMusics', (event, args) => {
    store.SetMusicsOptions(args);
})

ipcMain.handle('music-titles', (event, args) => {
    var result = [];
    var promise = [];
    var running = true;

    for (var i = 0; i < args.length; i++) {
        const url = args[i].url;
        
        if (youtube.validateURL(url)) {
            promise.push(new Promise((resolve, reject) => {
                youtube.GetMusicInfo(url).then((info) => {
                    result.push({title: info.title, url: url});
                    resolve();
                }, reject);
            }));
        }
    }

    return new Promise((resolve, reject) => {
        Promise.all(promise)
        .then(() => {
            log(result);
            result.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resolve(result);
        }, reject)
    })
    

});

ipcMain.handle('music-isvalid', (event, url) => {
    return youtube.validateURL(url);
});
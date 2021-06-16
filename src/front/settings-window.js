'use strict';

const { log } = require('electron-log');
const { app, BrowserWindow, ipcMain, session } = require('electron');
const store = require('../func/store');
const youtube = require('../func/youtube-audio');
var settingsWindow = null;

const settingsPath = 'src/front/settings.html';
const musicsPath = 'src/front/musics.html';
const aboutPath = 'src/front/about.html';

exports.Open = Open;

function Open(iconPath) {
    if (settingsWindow == null) {
        settingsWindow = new BrowserWindow({
            width: 600,
            height: 430,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }, 
            resizable: false,
            fullscreenable: false,
            fullscreen: false,
            modal: false,
            minimizable: false,
            maximizable: false,
            frame: true,
            icon: iconPath
        });

        settingsWindow.loadFile(settingsPath);
        settingsWindow.webContents.openDevTools();

        settingsWindow.on('closed', function() {
            settingsWindow = null;
        });
    }
}

ipcMain.on('gotoSettings', () => {
    settingsWindow.webContents.loadFile(settingsPath);
})

ipcMain.on('gotoMusics', () => {
    settingsWindow.webContents.loadFile(musicsPath);
})

ipcMain.on('gotoAbout', () => {
    settingsWindow.webContents.loadFile(aboutPath);
})

ipcMain.handle('getData', () => {
    const result = store.GetOptions();
    return result;
})

ipcMain.handle('setSleep', (event, args) => {
    store.SetSleepOptions(args);
})

ipcMain.handle('setMusics', (evetn, args) => {
    store.SetMusicsOptions(args);
})

ipcMain.on('music-titles', (event, args) => {
    var result = [];
    var promise = [];

    log(args);

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

    Promise.all(promise).then(() => {
        result.sort();
        log(result);
        settingsWindow.webContents.send('music-titles', result);
    })
})
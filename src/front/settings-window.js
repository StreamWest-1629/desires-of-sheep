'use strict';

const { app, BrowserWindow, ipcMain, session } = require('electron');
const store = require('../func/store');
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
            frame: false,
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
    settingsWindow.webContents.loadFile('front/settings.html');
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
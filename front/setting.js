'use strict';

// Standard Modules
const electron = require('electron');
const {app, BrowserWindow, ipcMain } = require('electron');
const log = require('electron-log');
const Store = require('../back/store');
const sleep = require('../back/sleep');
let setWindow = null;

exports.Open = function() {

    if (setWindow == null) {            
        setWindow = new BrowserWindow({
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
            icon: __dirname + "/../img/icon.jpg"
        });

        setWindow.loadFile('front/setting.html');

        setWindow.webContents.openDevTools();

        setWindow.on('closed', function() {
            electron.session.defaultSession.clearCache(() => {});
            setWindow = null;
        });

        app.on('window-all-closed', () => {});
    }
}

ipcMain.on('update', (event, args) => {
    switch (args['mode']) {
        case 'initialize':
            break;
        case 'standard':
            Store.SetOptions('sleep', {
                time: args['sleep']['time']['msecs'],
                span: args['sleep']['span']['msecs'] 
            });
            sleep.GetFromData();
            break;
        case 'music':
            break;
    }
    
    event.reply('update-reply', Store.GetOptions());
});

ipcMain.on('kill', (event) => {
    if (setWindow != null) {
        setWindow.close();
    }
});

ipcMain.on('gotoMusics', (event) => {
    log.log('Load Start');
    setWindow.webContents.loadFile('front/musics.html');
});

ipcMain.on('gotoSettings', () => {
    setWindow.webContents.loadFile('front/setting.html');
})

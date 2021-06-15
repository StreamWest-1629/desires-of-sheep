'use strict';

const { app, BrowserWindow, ipcMain, session } = require('electron');
var settingsWindow = null;

exports.Open = Open;

function Open() {
    if (settingsWindow == null) {
        settingsWindow = new BrowserWindow({
            width: 600,
            height: 430,
            autoHideMenuBar: true,
            webPrefences: {
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
            icon: `${__dirname}/img/icon.jpg`
        });

        settingsWindow.loadFile('front/settings.html');
        settingsWindow.webContents.openDevTools();

        settingsWindow.on('closed', function() {
            settingsWindow = null;
        });
    }
}

ipcMain.on('update', (event, args) => {

    // todo: write listenner
});

ipcMain.handle('initialize', (event) => {
    
    // todo: write listenner
})


ipcMain.on('kill', (event) => {
    if (settingsWindow != null) { 
        settingsWindow.close();
    }
});

ipcMain.on('gotoSettings', () => {
    settingsWindow.webContents.loadFile('front/settings.html');
})

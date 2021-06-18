'use strict';

const { app, Tray, BrowserWindow, session } = require('electron');
const constants = require('./constants');

const tooltipStr = '希望の睡眠 - 設定を開く';


let tray = null;

app.on('window-all-closed', () => {
    session.defaultSession.clearCache(() => {});
});

app.on('ready', () => {
    tray = new Tray(constants.iconPath);
    tray.on('double-click', () => { OpenWindow(); });
});

function OpenWindow() {
    const win = constants.WinCreate(new BrowserWindow({
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
        icon: constants.iconPath
    }));

    win.loadFile(constants.htmlPath.settings);
    win.webContents.on('will-navigate', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    })
    
    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    })

    win.on('closed', function() {
        settingsWindow = null;
    });
}

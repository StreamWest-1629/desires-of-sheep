'use strict';

// Standard Modules
const electron = require('electron');
const {app, BrowserWindow } = require('electron');

let setWindow = null;

exports.Open = function() {
    setWindow = new BrowserWindow({
        width: 600,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        fullscreenable: false,
        fullscreen: false,
        modal: false,
        minimizable: false,
        maximizable: false,
        icon: __dirname + "/../img/icon.jpg",
        title: __dirname + "/../img/icon.jpg"
    });

    setWindow.loadFile('front/setting.html');
    setWindow.on('closed', function() {
        electron.session.defaultSession.clearCache(() => {});
        setWindow = null;
    });

    app.on('window-all-closed', () => {});
}

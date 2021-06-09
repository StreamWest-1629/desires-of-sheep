'use strict';

// Standard Modules
const electron = require('electron');
const {app, BrowserWindow, ipcMain } = require('electron');
const console = require('electron-log');
const Store = require('electron-store');
const store = new Store();
let setWindow = null;

exports.Open = function() {

    if (setWindow == null) {            
        setWindow = new BrowserWindow({
            width: 600,
            height: 450,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            resizable: false,
            fullscreenable: false,
            fullscreen: false,
            modal: true,
            minimizable: false,
            maximizable: false,
            frame: true,
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

ipcMain.on('async', function(event, args, arg2) {
    switch (args) {
        case "init":
            var  array = [];

            var arg_time = store.get('sleep-time');
            var arg_span = store.get('sleep-span');

            array.push(arg_time);
            array.push(arg_span);
    }
    console.log(args);
});

ipcMain.on('close', function(event, args) {
    setWindow.close();
});

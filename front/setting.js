'use strict';

// Standard Modules
const electron = require('electron');
const {app, BrowserWindow } = require('electron');
const console = require('console');
const Store = require('electron-store');
const store = new Store();
const ipcMain = require('electron').ipcMain;

let setWindow = null;

exports.Open = function() {

    if (setWindow == null) {            
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
            frame: true,
            icon: __dirname + "/../img/icon.jpg"
        });

        setWindow.loadFile('front/setting.html');
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
});

ipcMain.on('close', function(event, args) {
    setWindow.close();
});

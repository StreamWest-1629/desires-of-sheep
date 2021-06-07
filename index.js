'use strct';

// Standard Modules
const electron = require('electron');
const {app, Tray, Menu } = require('electron');
const time = require('./back/time');
const settings = require('./front/setting');
const path = require('path');
const join = require('path').join;
const fs = require('fs');
const ipcMain = require('electron').ipcMain;

const Store = require('electron-store');
const store = new Store();
var Promise = require('promise');
var CronJob = require('node-cron');
var AutoLaunch = require('auto-launch');
const console = require('console');
var jobs;

app.on('ready', () => {
    tray = new Tray(__dirname + '/img/icon.jpg');

    const ctxMenu = Menu.buildFromTemplate([
        {label: 'Settings...', click(menuItem) {settings.Open();}}
    ]);

    time.LocalNow((longitude, latitude) => {
        tray.setToolTip(`Coorinates: ${longitude}, ${latitude}`)
    });
    
    tray.setToolTip("Happy");
    tray.on('right-click', () => {
        tray.popUpContextMenu(ctxMenu);
    });
});

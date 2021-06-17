'use strict';
const electron = require('electron');
const tray = require('./src/front/task-tray');
const { exec } = require('child_process');

var isShutdown = false;

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

electron.app.on('window-all-closed', () => {
    electron.session.defaultSession.clearCache(() => {});
})

electron.app.on('ready', () => {
    tray.Run();
});

electron.app.on('will-quit', () => {
    if (!isShutdown) {
        const child = exec(electron.app.getAppPath());
    }
});

electron.powerMonitor.addListener('shutdown', () => { isShutdown = true; });

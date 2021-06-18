'use strict';
const { app, powerMonitor, session } = require('electron');
const tray = require('./src/front/task-tray');
const { exec } = require('child_process');

var isShutdown = false;

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

app.on('window-all-closed', () => {
    session.defaultSession.clearCache(() => {});
})

app.on('ready', () => {
    tray.Run();
});

app.on('will-quit', () => {
    if (!isShutdown) {
        const child = exec(app.getAppPath());
    }
});

powerMonitor.addListener('shutdown', () => { isShutdown = true; });

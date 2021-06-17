'use strict';
const electron = require('electron');
const tray = require('./src/front/task-tray');

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

electron.app.on('window-all-closed', () => {
    electron.session.defaultSession.clearCache(() => {});
})

electron.app.on('ready', () => {
    tray.Run();
});

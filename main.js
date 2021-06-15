'use strict';

const { app, Tray, session } = require('electron');
// const { Open } = require('./win/settings');

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

app.on('window-all-closed', () => {
    session.defaultSession.clearCache(() => {});
})

app.on('ready', () => {
    require('./src/front/task-tray');
});

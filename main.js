'use strict';

const { app, Tray } = require('electron');
// const { Open } = require('./win/settings');

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

app.on('ready', () => {
    const tray = new Tray(`${__dirname}/img/icon.jpg`);
    tray.setToolTip(`Happy`);
});

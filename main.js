'use strict';

const { app, Tray } = require('electron');
// const { Open } = require('./win/settings');

require('electron-reload')(`${__dirname}/src`, {
    electron: require(`${__dirname}/node_modules/electron`)
});

app.on('ready', () => {
    require('./src/front/task-tray');
});

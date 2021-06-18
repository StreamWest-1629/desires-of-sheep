'use strict';

const { app, Tray, BrowswerWindow, session } = require('electron');
const iconPath = `${__dirname}/../img/icon.jpg`;

let tray;

app.on('window-all-closed', () => {
    session.defaultSession.clearCache(() => {});
});

app.on('ready', () => {
    tray = new Tray(iconPath);
});

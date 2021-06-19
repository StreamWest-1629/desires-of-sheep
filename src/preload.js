'use strict';

const { ipcRenderer, dialog } = require('electron');
const { log } = require('electron-log');
const { TimeSpan } = require('timespan');

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
    global.log = log;
    global.TimeSpan = TimeSpan;
    global.dialog = dialog;
});

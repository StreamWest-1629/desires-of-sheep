'use strict';

const { ipcRenderer } = require('electron');
const { log } = require('electron-log');
const { TimeSpan } = require('timespan');

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
    global.log = log;
    global.TimeSpan = TimeSpan;
});

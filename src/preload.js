'use strict';

const { ipcRenderer, dialog } = require('electron');
const { TimeSpan } = require('timespan');

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
    global.TimeSpan = TimeSpan;
    global.dialog = dialog;
});

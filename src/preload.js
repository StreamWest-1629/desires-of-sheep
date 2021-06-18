'use strict';

const { ipcRenderer } = require('electron');
const { TimeSpan } = require('timespan');

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
});

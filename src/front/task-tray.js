'use strict';

const { Tray, Menu } = require('electron');
const { log } = require('electron-log');
const { Open } = require('./settings-window');
const run = require('../usecase/run');

const iconPath = `${__dirname}/../../img/icon.jpg`;
let tray;
exports.Run = Run;

function Run() {
    
    log("Task-Tray load START.");
    log(iconPath);

    tray = new Tray(iconPath);
    const toolTipStr = "希望の睡眠 - 設定を開く...";
    const ctx = Menu.buildFromTemplate([
        {label: 'Settings...', click(menuItem) { Open(iconPath); }}
    ]);

    tray.setToolTip(toolTipStr);
    tray.on('double-click', () => { Open(iconPath); });
    tray.on('right-click', () => { tray.popUpContextMenu(ctx); });
}
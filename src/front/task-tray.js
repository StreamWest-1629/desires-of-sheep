'use strict';

const { Tray, Menu } = require('electron');
const settings = require('./settings-window');

const tray = new Tray(`${__dirname}/img/icon.jpg`);
const toolTipStr = "希望の睡眠 - 設定を開く...";
const ctx = Menu.buildFromTemplate([
    {label: 'Settings...', click(menuItem) { settings.Open(); }}
]);

tray.setToolTip(toolTipStr);
tray.on('double-click', () => { settings.Open(); });
tray.on('right-click', () => { tray.popUpContextMenu(ctx); });

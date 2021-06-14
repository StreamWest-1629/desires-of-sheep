'use strct';

// Standard Modules
const electron = require('electron');
const {app, Tray, Menu } = require('electron');
const time = require('./back/time');
const sleep = require('./back/sleep');
const autorun = require('./back/autorun');
const setting = require('./front/setting');

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

// アプリ開始時に実行される関数群
app.on('ready', () => {
    tray = new Tray(__dirname + '/img/icon.jpg');

    // const ctxMenu = Menu.buildFromTemplate([
    //     {label: 'Settings...', click(menuItem) {SettingOpen();}}
    // ]);

    time.LocalNow((datetime) => {
        // sleep.Check()
        tray.setToolTip(String(datetime));
    });
    
    tray.setToolTip("Happy");
    tray.on('double-click', () => {
        setting.Open();
    });
    // tray.on('click', () => {
    //     tray.popUpContextMenu(ctxMenu);
    // });
    
});

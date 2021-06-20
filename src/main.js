'use strict';

const { app, Tray, BrowserWindow, session, shell } = require('electron');
const AutoLaunch = require('auto-launch');
// const { exec } = require('child_process');
const constants = require('./constants');
const ipc = require('./ipc-main');
const tooltipStr = '希望の睡眠 - 設定を開く';
const run = require('./run');
let isShutdown = false;

let tray = null;

var launcher = new AutoLaunch({
    name: '希望の睡眠',
    path: app.getPath('exe')
});

launcher.isEnabled()
    .then((isEnabled) => {
        if (isEnabled) {
            return;
        }
        launcher.enable();
    })
    .catch((err) => {});

app.on('window-all-closed', () => {
    session.defaultSession.clearCache(() => {});
});

app.on('ready', () => {
    const doubleBoot = app.requestSingleInstanceLock();
    if (!doubleBoot) {
        app.quit();
    }
    // if (!app.commandLine.hasSwitch('force-keep')) {
    //     const doubleBoot = app.requestSingleInstanceLock();
    //     dialog.showMessageBox({message: '強制起動ではありません'});
    //     if (!doubleBoot) {
    //         app.quit();
    //     }
    // } else {
    //     dialog.showMessageBox({message: '強制起動しました'});
    // }

    tray = new Tray(constants.iconPath);
    tray.setToolTip(tooltipStr);
    tray.on('double-click', () => { OpenWindow(); });
});

// app.on('before-quit', (event) => {
//     if (!isShutdown) {
//         const cmd = `${app.getPath('exe')} -force-keep`;
//         dialog.showMessageBox({message: cmd});
//         event.preventDefault();
//         // exec(cmd);
//         isShutdown = true;
//     }
// });

function OpenWindow() {
    const win = constants.WinCreate(new BrowserWindow({
        width: 600,
        height: 430,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }, 
        resizable: false,
        fullscreenable: false,
        fullscreen: false,
        modal: false,
        minimizable: false,
        maximizable: false,
        frame: false,
        icon: constants.iconPath
    }));

    win.loadFile(constants.htmlPath.settings);
    // win.webContents.openDevTools();
    
    win.webContents.on('will-navigate', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    })
    
    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    })

    win.on('closed', function() {
        constants.WinClose();
    });
}

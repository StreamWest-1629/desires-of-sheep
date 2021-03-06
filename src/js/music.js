'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');

var playerWindow = null;
var isPlaying = false;
var playQueue = [];
let onPop = new Promise((resolve) => {resolve();});

exports.OnPop = OnPop;
exports.PlayStart = PlayStart;
exports.Append = Append;
exports.Pause = Pause;

function OnPop(func = new Promise((resolve) => {resolve();})) {
    onPop = func;
}

function PlayStart(urls = []) {
    if (urls.length > 0) {
        Append(urls);
    }
    isPlaying = true;
    if (playerWindow == null) {
        load();
    } else {
        playerWindow.webContents.send('music-resume');
    }
}

function Append(urls = []) {
    playQueue.push(urls);
}

function Pause() {
    isPlaying = false;
    if (playerWindow != null) {
        playerWindow.webContents.send('music-pause');
    }
}

function pop() {
    playQueue.shift();
    onPop()
    .then(() => {
        if (playerWindow != null) {
            if (playQueue.length > 0) {
                load();
            } else {
                playerWindow.close();
            }
        }
    });    
}

function load() {
    if (isPlaying && playQueue.length > 0) {
        if (playerWindow == null) {
            createWindow().then(() => {
                inload();
            });
        } else {
            inload();
        }            
    }

    function inload() {
        playerWindow.webContents.send('music-load-and-play', { url: playQueue[0] });
    }
}

function createWindow() {
    return new Promise((resolve, reject) => {
        if (playerWindow == null) {
            playerWindow = new BrowserWindow({
                width: 0,
                height: 0,
                focusable: false,
                frame: false,
                opacity: 0,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                }
            });

            playerWindow.loadFile("src/js/music.html");
            playerWindow.webContents.openDevTools();

            playerWindow.on('closed', () => {
                playerWindow = null;
                isPlaying = false;
            });

            ipcMain.on('music-end', () => {
                pop();
            });

            resolve();

        } else {
            resolve();
        }
    })
}

const electron = require('electron');
const ytdl = require('ytdl-core');
const { app, BrowserWindow, ipcMain } = require('electron');

// var buf = new fs.WriteStream(dir + ytdl.getVideoID(url) + "." + ext);

var playerWindow = null;
var initialized = false;
var playQueue = [];
exports.OnNext = function(arg) {}

ipcMain.on('music-ended', (event, arg) => {
    exports.OnNext(arg);
    pop(true);
})

ipcMain.on('music-init', (event) => {

    initialized = true;
    if (playQueue.length > 0) {
        load();
    }
})

exports.Resume = Resume;
exports.Append = Append;
exports.Pause = Pause;

function Resume() {
    playerWindow.webContents.send('music-play');
}

function Pause() {
    playerWindow.webContents.send('music-pause');
}

function Append(url) {
    if (playerWindow == null) { init(); }
    playQueue.push(url);
    if (playQueue.length == 1 && initialized) {
        load();
    }
}

function load() {
    if (!ytdl.validateURL(playQueue[0])) {
        pop(true);
    }
    ytdl.getInfo(ytdl.getURLVideoID(playQueue[0])).then((info) => {
        const audios = ytdl.filterFormats(info.formats, 'audioonly');
        playerWindow.webContents.send('music-load', {url: audios[0].url });
    });
}

function pop(doNext) {
    playQueue.shift();
    if (doNext && playQueue.length > 0) {
        load();
    } else if(playQueue.length == 0) {
        playerWindow.close();
    }
}

function init() {

    playerWindow = new BrowserWindow({
        width: 0,
        height: 0,
        focusable: false,
        frame: false,
        opacity: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    playerWindow.loadFile("func/player.html");


    playerWindow.on('closed',function() {
        electron.session.defaultSession.clearCache(() => {});
        playerWindow = null;
        initialized = false;
    })

}

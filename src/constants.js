'use strict';

const iconPath = `${__dirname}/../img/icon.jpg`;
const htmlPath = {
    settings: 'src/html/settings.html',
    musics: 'src/html/musics.html',
    about: 'src/html/about.html'
};

exports.iconPath = iconPath;
exports.htmlPath = htmlPath;

var win = null;
function WinClose() { win = null };
function WinCreate(bw) { win = bw; return win; };
function GetWin() { return win };

exports.WinClose = WinClose;
exports.WinCreate = WinCreate;
exports.GetWin = GetWin;

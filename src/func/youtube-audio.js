'use strict';

const electron = require('electron');
const { validateURL, getInfo, getURLVideoID, filterFormats } = require('ytdl-core');

exports.validateURL = validateURL;
exports.GetMusicUrl = getMusicUrl;
exports.GetMusicInfo = getMusicInfo;

function getMusicUrl(url) {
    return new Promise((resolve, reject) => {
        getInfo(getURLVideoID(url)).then((info) => {
            const audios = filterFormats(info.formats, 'audioonly');
            resolve(audios[0].url);
        })
    });
}

function getMusicInfo(url) {
    return new Promise((resolve, reject) => {
        getInfo(getURLVideoID(url)).then((info) => {
            resolve(info.videoDetails);
        })
    })
}

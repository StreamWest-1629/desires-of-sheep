'use strict';

const { validateURL, getInfo, getURLVideoID, filterFormats } = require('ytdl-core');

exports.validateURL = validateURL;
exports.GetMusicUrl = getMusicUrl;
exports.GetMusicInfo = getMusicInfo;

const numTry = 5;

function getMusicUrl(url) {
    return new Promise((resolve, reject) => {
        GetYoutube(url).then((info) => {
            const audios = filterFormats(info.formats, 'audioonly');
            resolve(audios[0].url);
        }, reject);
    })    
}

function getMusicInfo(url) {
    return new Promise((resolve, reject) => {
        GetYoutube(url).then((info) => {
            resolve(info.videoDetails);
        }, reject);
    });
}

function GetYoutube(url, i = 0) {
    return new Promise((resolve, reject) => {
        getInfo(getURLVideoID(url)).then(
            resolve, 
            (reason) => {
                if (i < numTry - 1) {
                    return GetYoutube(url, i + 1);
                } else {
                    return reject(`Failed Reason of Final trying: ${reason}`).then();
                }
            })
    })
}

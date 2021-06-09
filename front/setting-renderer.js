const electron = require('electron');
const { ipcRenderer } = require('electron');
const log = require('electron-log');

window.onload = function() {
    ipcRenderer.on("update", function(event, args){

    })
    document.querySelector('#option-close').addEventListener('click', function(event) {
        document.querySelector('.win-title').textContent = "PM 12:00";
    });
};

function onclose() {
    document.querySelector('.win-title').textContent = "PM 12:00";
}

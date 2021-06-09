const electron = require('electron');
const { ipcRenderer } = require('electron');
const log = require('electron-log');

exports.ReceiveValue = function(event, args) {};
exports.SendValue = function() {return { mode:"initialize" };};

exports.Initializer = function() {
    
    // ipc Receiver
    ipcRenderer.on("update", function(event, args){ ReceiveValue(event, args) });

    // Initialize
    ipcRenderer.send("update", { mode:"initialize" });

    // Button EventListener
    document.querySelector('#option-close').addEventListener('click', function(event) { onclose() });
    document.querySelector('#option-save').addEventListener('click', function(event) { onsave() });
};

function onclose() {
    ipcRenderer.send("kill");
}
function onsave() {
    ipcRenderer.send("update", SendValue());
}
function SettingSave() {
    // 
}

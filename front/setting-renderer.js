const electron = require('electron');
const { ipcRenderer } = require('electron');
const log = require('electron-log');
const timespan = require('timespan');
const { TimeSpan } = require('timespan');

var SendValue
var ReceiveValue

exports.Initializer = function(recieve, send) {
    
    SendValue = send;
    ReceiveValue = recieve;

    // ipc Receiver
    ipcRenderer.on("update-reply", function(event, args){ 
        log.log("ipc-Renderer reached.")
        // log.log(args);
        // var time = new TimeSpan(args['sleep-time']);
        // var span = new TimeSpan(args['sleep-span']);
        // const timestr = ('00' + time.hours).slice(-2) + ":" + ('00' + time.minutes).slice(-2);
        // document.querySelector('label[for="sleep-time"]').textContent = timestr;
        ReceiveValue(event, args) 
    });

    // Initialize
    ipcRenderer.send("update", { mode:"initialize" });

    // Button EventListener
    if (document.querySelector('#option-close') != null) {
        document.querySelector('#option-close').addEventListener('click', function(event) { onclose() });
    }
    if (document.querySelector('#option-save') != null) {
        document.querySelector('#option-save').addEventListener('click', function(event) { onsave() });
    }
    if (document.querySelector('#option-back') != null){
        document.querySelector('#option-back').addEventListener('click', function(event) { onback() });
    }
};

function onclose() {
    ipcRenderer.send("kill");
}
function onsave() {
    ipcRenderer.send("update", SendValue());
}
function onback() {
    ipcRenderer.send("gotoSettings");
}

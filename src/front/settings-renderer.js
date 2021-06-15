'use strict';

const { ipcRenderer } = require('electron');
var UpdateFunc;
var SendFunc;

exports.SetSleep = SetSleep;
exports.SetMusic = SetMusic;
exports.SetSaveStable = SetSaveStable;
exports.Initialize = Initialize;

const closeBtn = document.querySelector('#option-close');
const saveBtn = document.querySelector('#option-save');
const backBtn = document.querySelector('#option-back');

// function updateFuncDefault(saveData) {
//     return new Promise((resolve, reject) => {
        
//         // This Function is DEMO.
//         // You must this function as Initialize()'s argument.

//         // Todo:
//         // Each Write Usercases
//         resolve();
//     })
// }

// function sendFuncDefault() {
//     return new Promise((resolve, reject) => {

//         // This Function is DEMO.
//         // You must this function as Initialize()'s argument.

//         // Todo:
//         // Each Write Usercases and, 
//         // Save data with function; use SetSleep(), SetTime(), or SetMusics().
//         resolve();
//     })
// }

function Initialize(updateFunc, sendFunc) {

    UpdateFunc = updateFunc;
    SendFunc = sendFunc;

    if (closeBtn != null) { closeBtn.onclick = onclose; }
    if (saveBtn != null) { saveBtn.onclick = onsave; }
    if (backBtn != null) { backBtn.onclick = onback; }
}

function GetData() {
    ipcRenderer.invoke('getData').then((args) => {
        UpdateFunc(args);
    });
}

function SetSleep(args) {
    ipcRenderer.invoke('setSleep', args).then(() => {
        GetData();
    })
}

function SetMusic(args) {
    ipcRenderer.invoke('setMusics', args).then(() => {
        GetData();
    })
}

function onclose() {
    window.close();
}

function onsave() {
    SendFunc().then(() => {
        UpdateFunc()
    })
}

function onback() {
    ipcRenderer.send('gotoSettings');
}

function SetSaveStable(isEnable) {
    if (isEnable) {
        saveBtn.onclick = onsave;
        saveBtn.classList.remove('disable');
    } else {
        saveBtn.onclick = () => {};
        saveBtn.classList.add('disable');
    }
}

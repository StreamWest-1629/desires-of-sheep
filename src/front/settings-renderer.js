'use strict';

const { ipcRenderer } = require('electron');
const store = require('../func/store');

exports.SetSleep = store.SetSleepOptions;
exports.SetTime = store.SetTimeOptions;
exports.SetMusics = store.SetMusicsOptions;
exports.UpdateFunc = updateFuncDefault;
exports.SendFunc = sendFuncDefault;

const closeBtn = document.querySelector('#option-close');
const saveBtn = document.querySelector('#option-save');
const backBtn = document.querySelector('#option-back');

function updateFuncDefault(saveData = GetOptions()) {
    return new Promise((resolve, reject) => {
        
        // This Function is DEMO.
        // You must this function as Initialize()'s argument.

        // Todo:
        // Each Write Usercases
        resolve();
    })
}

function sendFuncDefault() {
    return new Promise((resolve, reject) => {

        // This Function is DEMO.
        // You must this function as Initialize()'s argument.

        // Todo:
        // Each Write Usercases and, 
        // Save data with function; use SetSleep(), SetTime(), or SetMusics().
        resolve();
    })
}

function Initialize(
    updateFunc = updateFuncDefault, 
    sendFunc = sendFuncDefault) {

    exports.UpdateFunc = updateFunc;
    exports.SendFunc = sendFunc;

    updateFunc(GetOptions()).then(() => {
        
    });

    if (closeBtn != null) { closeBtn.onclick = onclose; }
    if (saveBtn != null) { saveBtn.onclick = onsave; }
    if (backBtn != null) { backBtn.onclick = onback; }
}

function onclose() {
    window.close();
}

function onsave() {
    exports.SendFunc().then(() => {
        exports.UpdateFunc().then(() => {})
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
'use strict';

const { ipcRenderer } = require('electron');

var UpdateFunc;
var SendFunc;

exports.SetSleep = SetSleep;
exports.SetMusic = SetMusic;
exports.SetSaveStable = SetSaveStable;
exports.Initialize = Initialize;
exports.GotoMusics = GotoMusics;
exports.GotoAbout = GotoAbout;

document.querySelector('#bg').style['opacity'] = 0;
document.querySelectorAll('button, input').forEach((e) => {
    e.style['transition'] = '0s';
    e.style['z-index'] = -1;
})
/// document.querySelector('#bg').style['display'] = 'none';

const closeBtn = document.querySelector('#option-close');
const saveBtn = document.querySelector('#option-save');
const backBtn = document.querySelector('#option-back');

function updateFuncDefault(saveData) {
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

function Initialize(updateFunc = updateFuncDefault, sendFunc = sendFuncDefault) {

    UpdateFunc = updateFunc;
    SendFunc = sendFunc;

    GetData().then(() => {
        if (closeBtn != null) { closeBtn.onclick = onclose; }
        if (saveBtn != null) { saveBtn.onclick = onsave; }
        if (backBtn != null) { backBtn.onclick = onback; }
        document.querySelectorAll('button, input').forEach((e) => {
            e.style['z-index'] = 100;
        })
        document.querySelectorAll('button').forEach((e) => {
            e.style['transition'] = '.3s';
        })
        // document.querySelector('#bg').style['display'] = 'block';
        
        document.querySelector('#bg').style['opacity'] = 1;
    })

}

function GetData() {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('getData').then((args) => {
            UpdateFunc(args).then(resolve, reject)
        });
    })
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

function GotoMusics() {
    ipcRenderer.send('gotoMusics');
}

function GotoAbout() {
    ipcRenderer.send('gotoAbout');
}

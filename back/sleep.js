'use strict';

const timespan = require('timespan');
const { TimeSpan } = require('timespan');
const store = require('./store');

var startTime;
var endTime;

init();

function init() {
    GetFromData();
}

function GetFromData() {
    const savedata = store.GetOptions();
    startTime = new TimeSpan(0, 0, parseInt(savedata['sleep-time']));
    endTime = new TimeSpan(0, 0, parseInt(savedata['sleep-span']));
    endTime.add(startTime);
}

exports.SetToData = function(start, span) {
    store.SetOptions('sleep-time', toString(startTime.totalMinutes()));
    store.SetOptions('sleep-span', toString(endTime.totalMinutes()));
}

function Check(datenow) {
    now = timespan(0, 0, datenow.getMinites(), datenow.getHours());
    if (startTime > now) {
        var dif = TimeSpan.clone(startTime);
        dif.subtract(now);
        if (dif.totalHours() < 1) {
            near();
        }
        now.addHours(24);
    }
    if (now < endtime) {
        shutdown();
    } 
}

function shutdown() {
    new Notification({ title: "寝よう", body: "寝ましょう" }).show();
}

function near() {

}

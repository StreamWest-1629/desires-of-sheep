'use strict';

const timespan = require('timespan');

let startTime = timespan.TimeSpan();
let endTime = timespan.TimeSpan();
let initialized = false;

exports.GetFromData = function(starttime, span) {
    startTime = timespan(starttime);
    endTime = timespan(span);
    endTime.add(startTime);
}

exports.Check = function(datenow) {
    if (initialized) {
        now = timespan(0, 0, datenow.getMinites(), datenow.getHours());
        if (startTime > now) {
            
            var dif = timespan.clone(startTime);
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
}

function shutdown() {

}

function near() {

}

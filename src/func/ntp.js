'use strict';

const moment = require('moment');
const { get } = require('request');
const { getNetworkTime } = require('ntp-client');
const { getFuzzyLocalTimeFromPoint } = require('@mapbox/timespace');

const geo_options = {
    url: 'https://get.geojs.io/v1/ip/geo.json',
    json: true
};

const ntp = {
    url: 'time.google.com',
    port: 123
};

exports.GetLocalTime = GetLocalTime;

// then() gives Moment Time as argument.
function GetLocalTime() {
    return new Promise((resolve, reject) => {
        get(geo_options, (err, res, body) => {
            if (err) {
                reject(err);
            }

            const latitude = parseFloat(body.latitude);
            const longitude = parseFloat(body.longitude);

            getNetworkTime(ntp.url, ntp.port, (err, date) => {
                if (err) {
                    reject(err);
                } else {
                    const moment_date = getFuzzyLocalTimeFromPoint(date.dateTime(), [longitude, latitude]);
                    resolve(moment_date);
                }
            });
        });
    });
}
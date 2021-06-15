'use strict';

var ts = require('@mapbox/timespace');
const console = require('console');
var request = require('request');
var ntpClient = require('ntp-client');
const moment = require('moment');

// 日時を確認する
exports.LocalNow = function(then = function(datenow){}) {


    var geo_options = {
        url: 'https://get.geojs.io/v1/ip/geo.json',
        json: true,
    };

    try {

        request.get(geo_options, function(error, response, body) {
            if (error) {
                throw error;
            }
            var latitude = parseFloat(body.latitude)
            var longitude = parseFloat(body.longitude)       
            

            // 現在時刻を取得する
            ntpClient.getNetworkTime("time.google.com", 123, function(err, date) {
                if (err) {
                    throw err;
                    return;
                } else {
                    // タイムゾーンから現在時刻を取得する

                    var datenow = ts.getFuzzyLocalTimeFromPoint(date.getTime(), [longitude, latitude]);
                    then(datenow.toDate());
                }
            })
        })
    } catch (err) {
        throw err;
    }
}


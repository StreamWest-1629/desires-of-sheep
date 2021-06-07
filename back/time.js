'use strict';

var ts = require('@mapbox/timespace');
const console = require('console');
var request = require('request');
var ntpClient = require('ntp-client');

// 日時を確認する
exports.LocalNow = function(then) {

    var geo_options = {
        url: 'https://get.geojs.io/v1/ip/geo.json',
        json: true,
    };

    request.get(geo_options, function(eror, response, body) {
        var latitude = parseFloat(body.latitude)
        var longitude = parseFloat(body.longitude)       
        

        // 現在時刻を取得する
        ntpClient.getNetworkTime("time.google.com", 123, function(err, date) {
            if (err) {
                console.error(err);
                return;
            } else {
                // タイムゾーンから現在時刻を取得する

                var datenow = ts.getFuzzyLocalTimeFromPoint(date.getTime(), [longitude, latitude]);
                then(datenow);
            }
        })
    })
}


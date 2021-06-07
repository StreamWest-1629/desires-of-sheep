'use strict';

var ts = require('@mapbox/timespace');
const console = require('console');
var request = require('request');

// 日時を確認する
exports.LocalNow = function(then) {

    var geo_options = {
        url: 'https://get.geojs.io/v1/ip/geo.json',
        json: true,
    };

    request.get(geo_options, function(eror, response, body) {
        var latitude = parseFloat(body.latitude)
        var longitude = parseFloat(body.longitude)       
        
        then(longitude, latitude);
    })
}


'use strict';
const request = require('request');
const localip = require('local-ip');
const interfaceLan = 'wlan0';

var restful = {
	lastTweet : function(){
		console.log('entro last tweet');
		return new Promise(function (fulfill, reject){
			request({
                url: 'http://potusmood.com/lamp',
                method: 'POST',
                body: JSON.stringify({
                })
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.body.error) {
                    reject(response.body.error);
                } else {

                    var jsonTweet = JSON.parse(response.body);
                    localip(interfaceLan, function(err, res) {
                      if (err) {
                        throw new Error('I have no idea what my local ip is.');
                      }
                      console.log('My local ip address on ' + interfaceLan + ' is ' + res);
                    });
                    fulfill(jsonTweet);
                }
            });
		});
	}
}

module.exports = restful;
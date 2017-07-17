'use strict';
require('dotenv').config({silent: true});
const fs = require('fs');
const request = require('request');
const localip = require('local-ip');
const interfaceLan = 'wlan0';

var restful = {
	lastTweet : function(){
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
                        reject(err);
                      }
                      restful.sendMyIp(res).then(
                        function(data){
                            fulfill(jsonTweet);
                        }, function(e){
                            reject(e);
                        });
                    });
                }
            });
		});
	},
    sendMyIp : function(myIp){
        return new Promise(function (fulfill, reject){
            request({
                url: 'http://potusmood.com/pull-my-ip',
                method: 'POST',
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                json: {
                    myIp : myIp,
                    id :  process.env.ID 
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.body.error) {
                    reject(response.body.error);
                } else {
                    fulfill(true);
                }
            });
        });
    }
}

module.exports = restful;
'use strict';
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
                      this.sendMyIp(res).then(
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
                data: {
                    myIp : myIp,
                    id :  process.env.ID 
                },
                body: JSON.stringify({
                })
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
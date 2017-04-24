'use strict';
const request = require('request');


var restful = {
	lastTweet : function(){
		console.log('entro');
		return new Promise(function (fulfill, reject){
			request({
                url: process.env.URL_BACKEND + '/lamp',
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
                    fulfill(jsonTweet);
                }
            });
		});
	}
}

module.exports = restful;
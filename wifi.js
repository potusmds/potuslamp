'use strict';
const lineReader = require('line-reader');
const promise = require('bluebird');
const cmd = require('node-cmd');

const wifiInterface = {
	getSSID : function(){
		let ssid = [];

		return new Promise(function(resolve, reject){
			cmd.get("sudo /home/pi/trumpmood/readfile.sh", function(err, data, stderr){
				
				if(err){
					reject(err);
				}

	            var eachLine = promise.promisify(lineReader.eachLine);

				eachLine('./ssid.txt', function(line) {
				  	ssid.push(line.replace('ESSID:"', '').replace('"', ''));
				}).then(function() {
				  	resolve(ssid);
				}).catch(function(err) {
				  	reject(err);
				});

			});
        });
	}
}

module.exports = wifiInterface;
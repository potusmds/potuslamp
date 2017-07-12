'use strict';
const wifi = require('node-wifi');

wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});

const wifiInterface = {
	getSSID : function(){
		wifi.scan(function(err, networks) {
		    if (err) {
		        console.log(err);
		    } else {
		        console.log(networks);
		        /*
		        networks = [
		            {
		                ssid: '...',
		                mac: '...',
		                frequency: <number>, // in MHz
		                signal_level: <number>, // in dB
		                security: '...' // unfortunately the format still depends of the OS
		            },
		            ...
		        ];
		        */
		    }
		});
	}
}

module.exports = wifiInterface;
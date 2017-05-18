'use strict';

const five = require("johnny-five");
const io = require('socket.io-client');
const pixel = require("./node_modules/node-pixel/lib/pixel.js");
const sleep = require('sleep');
const restful = require('./restful.js');

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

var fps = 20; // how many frames per second do you want to try?

//var board = new five.Board();

var app = {
	start: function(){

		board.on("ready", function() {
			let fadeout = null;
			let wink = null;
			let intensity = 0;
			let direction = 1;
			let led = new five.Led.RGB({
				pins: {
				  red: 6,
				  green: 5,
				  blue: 3
				},
			isAnode: true
			});
			let eyebrowLeft = new five.Servo({
							pin: 7,
							startAt: 90
						});
			let eyebrowRight = new five.Servo({
							pin: 4,
							startAt: 90
						});
			let strip = new pixel.Strip({
		        data: 11,
		        length: 60,
		        color_order: pixel.COLOR_ORDER.GRB,
		        board: this,
		        controller: "FIRMATA",
		    });

		    strip.on("ready", function() {

		        console.log("Strip ready, let's go");
		    });

			let button = new five.Button(2);
			let hex = '#009900';
			let status = true;

			var faceObj = putStrip(['#1D4FF0', '#F01D64']);

			var eyesObj = {
					hexa : hex,
					type : "fadeInFadeOut",
					fadeInFadeOut : {
						time: 5
					},
					strobe: {
						time: 500
					}
				};

			var eyebrowsObj = {
				status: {
					value: 'wink',
					size: 'between',
					time: 900000
				},
				eyebrow: {
					left : {
						angle : 135,
						maxAngle : 150,
						minAngle : 90,
						interval : 2000,
						step: 100, 
						timeClose : 50000
					},
					right : {
						angle : 30,
						maxAngle : 30,
						minAngle : 90,
						interval : 2000,
						step: 100, 
						timeClose : 50000
					}
				},
				timeClose : 1000
			}

			let eyes = function (eyes){

				if(fadeout != null){
					clearInterval(fadeout);
					fadeout = null;
					intensity = 0;
				}
				console.log(eyes);
				led.stop();
				led.color(eyes.hexa);

				switch(eyes.type){
					case "strober" :
						led.strobe(eyes.strobe.time);
						break;
					case "fadeInFadeOut":
						fadeout = setInterval(function() {

							if(intensity >= 0 && intensity < 100 && direction == 1){
								led.intensity(intensity);
								intensity = intensity + 1;
							}else if(intensity <= 100 && intensity > 0 && direction == 0){
								led.intensity(intensity);
								intensity = intensity - 1;
							}else if(direction == 1){
								led.intensity(intensity);
								intensity = intensity - 1;
								direction = 0;
							}else{
								led.intensity(intensity);
								intensity = intensity + 1;
								direction = 1;
							}
						}, eyes.fadeInFadeOut.time);

						break;
					default:
				}
			}

			let eyebrows = function(eyebrows){
				if(wink != null){
					clearInterval(wink);
					wink = null;
				}
				switch(eyebrows.status.value){
					case 'wink':
						switch(eyebrows.status.size){
							case 'left':
								eyebrowLeft.sweep({
												range: [eyebrows.eyebrow.left.minAngle, eyebrows.eyebrow.left.maxAngle],
												interval: eyebrows.eyebrow.left.interval,
												step: eyebrows.eyebrow.left.step
											});

								setTimeout(function() {
									eyebrowLeft.stop();
									eyebrowLeft.home();
								}, eyebrows.eyebrow.left.timeClose);

								wink = setInterval(function(){
									eyebrowLeft.sweep({
														range: [eyebrows.eyebrow.left.minAngle, eyebrows.eyebrow.left.maxAngle],
														interval: eyebrows.eyebrow.left.interval,
														step: eyebrows.eyebrow.left.step
													});
									setTimeout(function() {
										eyebrowLeft.stop();
										eyebrowLeft.home();
									}, eyebrows.eyebrow.left.timeClose);									
								}, eyebrows.status.time);
								eyebrowRight.to(eyebrows.eyebrow.right.angle);
								eyebrowRight.stop();
								break;
							case 'right':
								eyebrowRight.sweep({
													range: [eyebrows.eyebrow.right.minAngle, eyebrows.eyebrow.right.maxAngle],
													interval: eyebrows.eyebrow.right.interval,
													step: eyebrows.eyebrow.right.step
												});

								setTimeout(function() {
									eyebrowRight.stop();
									eyebrowRight.home();
								}, eyebrows.eyebrow.right.timeClose);

								wink = setInterval(function(){
									eyebrowRight.sweep({
														range: [eyebrows.eyebrow.right.minAngle, eyebrows.eyebrow.right.maxAngle],
														interval: eyebrows.eyebrow.right.interval,
														step: eyebrows.eyebrow.right.step
													});
									setTimeout(function() {
										eyebrowRight.stop();
										eyebrowRight.home();
									}, eyebrows.eyebrow.right.timeClose);
								}, eyebrows.status.time);
								eyebrowLeft.to(eyebrows.eyebrow.left.angle);
								eyebrowLeft.stop();
								break;
							case 'between':
								eyebrowRight.sweep({
													range: [eyebrows.eyebrow.right.minAngle, eyebrows.eyebrow.right.maxAngle],
													interval: eyebrows.eyebrow.right.interval,
													step: eyebrows.eyebrow.right.step
												});
								eyebrowLeft.sweep({
													range: [eyebrows.eyebrow.left.minAngle, eyebrows.eyebrow.left.maxAngle],
													interval: eyebrows.eyebrow.left.interval,
													step: eyebrows.eyebrow.left.step
												});

								setTimeout(function() {										
									eyebrowRight.stop();
									eyebrowLeft.stop();
									eyebrowRight.home();
									eyebrowLeft.home();	
								}, eyebrows.timeClose);	
								wink = setInterval(function(){
									eyebrowRight.sweep({
														range: [eyebrows.eyebrow.right.minAngle, eyebrows.eyebrow.right.maxAngle],
														interval: eyebrows.eyebrow.right.interval,
														step: eyebrows.eyebrow.right.step
													});
									eyebrowLeft.sweep({
														range: [eyebrows.eyebrow.left.minAngle, eyebrows.eyebrow.left.maxAngle],
														interval: eyebrows.eyebrow.left.interval,
														step: eyebrows.eyebrow.left.step
													});

									setTimeout(function() {										
										eyebrowRight.stop();
										eyebrowLeft.stop();
										eyebrowRight.home();
										eyebrowLeft.home();	
									}, eyebrows.timeClose);							
								}, eyebrows.status.time);
						}
						break;
					default:
						eyebrowLeft.to(eyebrows.eyebrow.left.angle);
						eyebrowLeft.stop();
						eyebrowRight.to(eyebrows.eyebrow.right.angle);
						eyebrowRight.stop();
				}
				
			}

			let face = function(face){

				strip.off();
				var j = 0;

		        for(var i = 0; i < face.length * 1000 && j < face.length; i++){
		        	if(i % 10 == 0 && face[j].color == undefined){
		        		strip.pixel(j).color(face[j].color);
		        		strip.shift(1, pixel.FORWARD, true);
		        		strip.show();
		        		j++;
		        	}
        		}
        		strip.show();
        		for(var i = 0; i < face.length; i++){
		        	strip.pixel(i).color(face[i].color);
        		}

        		//strip.pixel(1).color(face[1].color);
				strip.show();
			}

			eyebrowLeft.stop();
			eyebrowRight.stop();
			
			var socket = io('ws://10.0.1.36:3000');

			socket.on('connect', function(){
				restful.lastTweet()
				.then(function(data){
					eyes(data.eyes);
					eyebrows(data.eyebrows);
					face(data.face);
				},function(e){
					console.log('last tweet',e);
				});
			});

			socket.on('connect_error', function(error){
				console.log('error socket: '+error);
			});

			socket.on('newlamp', function (data) {
				eyes(data.eyes);
				eyebrows(data.eyebrows);
				face(data.face);
			});

			/*function eyesStop(myEyes){
				var intensity = 100;
				led.color(myEyes.hexa);
				led.stop();
				var fadeout = setInterval(function() {
					if(intensity >= 0){
						console.log(intensity);
						led.intensity(intensity);
						intensity = intensity - 1;
					}else{
						led.off();
						clearInterval(fadeout);
					}
				}, 50);
			}

			function eyesStart(myEyes){
				var intensity = 0;
				led.color(myEyes.hexa);
				led.stop();

				var fadeout = setInterval(function() {
					if(intensity <= 100){
						led.intensity(intensity);
						intensity = intensity + 1;
					}else{
						eyes(myEyes);
						clearInterval(fadeout);
					}
				}, 50);
			}*/
		});
	}
}

function randomHex(){
	var hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
	var rand = [];
	for(var i = 0; i < 6; i++) {
	    rand.push(hexArray[Math.floor(Math.random() * hexArray.length)]);
	}
	var value = "#" + rand.join("");

	return value;
}

function putStrip(colors){
	var strip = [];
	var different = [8, 9, 10, 48, 49, 50];

	for(var i = 0; i < 60; i++){
		if(different.indexOf(i) != -1){
			var obj = {
				color : colors[1]
			}
		}else{
			var obj = {
				color : colors[0]
			}
		}
		strip[i] = obj;
	}

	return strip;
}

module.exports = app;
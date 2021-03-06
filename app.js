'use strict';

const http = require('http');
const express = require('express');
var lamp = require('./lamp.js');
const path  = require("path");
const wifi = require("./wifi.js");
const cmd = require("./cmd.js");
const bodyParser = require('body-parser')


var app = express();

app.use(express.static(path.join(__dirname, './', 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(rew, res){
	//res.end('hola mundo');
	
	res.render(path.join(__dirname, 'views/index.html'),{id: process.env.ID});
});

app.get('/ssid', function(req, res){
	wifi.getSSID().then(function(data){
		res.json(data);
	},function(e){
		console.log(e);
	});
});

app.get('/reset', function(req, res){
	cmd.reset().
	then(function(data){
		res.json(true);
	},function(e){
		console.log(e);
	});
});

app.get('/update', function(req, res){
	cmd.update().
	then(function(data){
		res.json(true);
	},function(e){
		console.log(e);
	});
});

app.post('/ssid', function(req, res){
	wifi.resetWifi(req.body.ssid, req.body.pw).then(
	function(data){
		res.json(true);
	}, function(e){
		console.log(e);
	});
});

module.exports = app;

lamp.start();
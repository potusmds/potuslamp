'use strict';

const http = require('http');
const express = require('express');
var lamp = require('./lamp.js');
const path  = require("path");
const wifi = require("./wifi.js")

var app = express();

app.use(express.static(path.join(__dirname, './', 'public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(rew, res){
	//res.end('hola mundo');
	wifi.getSSID();
	res.render(path.join(__dirname, 'views/index.html'),{});
});

module.exports = app;

lamp.start();
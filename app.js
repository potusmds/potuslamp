'use strict';

const http = require('http');
const express = require('express');
var lamp = require('./lamp.js');



var app = express();

module.exports = app;

lamp.start();
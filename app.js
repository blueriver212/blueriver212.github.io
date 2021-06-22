// the aim is to be able to set up an API that can returna geoJSON in a file
// once this is complete, can i return a file by its specific name?

// install required modules
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

// create a http server for the files
var http = require('http'); var https = require('https');
const { ppid } = require('process');

var httpServer = http.createServer(app);

port = 4480;
httpServer.listen(port);

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

app.get('/',function (req, res) {
	res.send("Hello world from the data API on port"+port)
});

app.use(express.static(__dirname));


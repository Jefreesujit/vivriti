'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);


app.get('/assets/:file', function(req,res){
	res.sendFile(__dirname + '/public/' + req.params.file);
});

app.get('/fonts/roboto/:file', function(req,res){
	res.sendFile(__dirname + '/fonts/roboto/' + req.params.file);
});

app.get('/data/psl-classification', function(req, res) {
	res.sendFile(__dirname + '/data/data.json');
});

app.get('/*', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(process.env.PORT || 3000, function(){
	console.log("listening on port " + http.address().port);
});

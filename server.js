'use strict';

var express = require('express');
var http = require('http');
var logger = require('morgan');
var Path = require('path');
var request = require('request');

exports.startServer = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(Path.join(__dirname, path)));
  app.use(express.static(Path.join(__dirname, 'data')));
  app.use(logger('dev'));

  var apiUrl = 'http://169.254.94.120:4567/json/lastresults';
  // var apiUrl = 'http://localhost:4567/json/lastresults';
  app.use('/lastresults', function(req, res) {
    req.pipe(request(apiUrl, function(error, response, body){
      if (error) {
        res.status(502).send({ error: 'Connection refused: live results unavailable', code: error.code });
      }
    })).pipe(res);
  });

  server.listen(port, callback);
};

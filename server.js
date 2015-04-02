'use strict';

var express = require('express');
var http = require('http');
var logger = require('morgan');
var Path = require('path');
var request = require('request');
var cache = require('memory-cache');

var retention = 29000; // retention time for cache
var localhost = 'localhost',
    pc1 = '169.254.94.120',
    liveserver = pc1;

exports.startServer = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(Path.join(__dirname, path)));
  app.use(express.static(Path.join(__dirname, 'data')));
  app.use(logger('dev'));

  var apiUrl = 'http://' + liveserver + ':4567/json/lastresults';
  app.use('/lastresults', function(req, res) {
    var hit = cache.get('lastresults');
    if (hit) {
      console.log('hit cache');
      res.json(hit);
    } else {
      console.log('proxy');
      req.pipe(request(apiUrl, function(error, response, body){
        if (error) {
          res.status(502).send({ error: 'Connection refused: live results unavailable', code: error.code });
        } else {
          cache.put('lastresults', JSON.parse(response.body), retention);
        }
      })).pipe(res);      
    }
  });

  server.listen(port, callback);
};

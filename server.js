'use strict';

var express = require('express');
var http = require('http');
var logger = require('morgan');
var Path = require('path');

// Notre fonction de démarrage serveur
exports.startServer = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(Path.join(__dirname, path)));
  app.use(express.static(Path.join(__dirname, 'data')));
  app.use(logger('dev'));

  app.get('/results', function(req, res) {
    res.json(require('./data/osplitsdata.json'));
  });

  server.listen(port, callback);
};

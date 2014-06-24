/* Import node's http module: */
var express = require('express');
var app = express();



var http = require("http");
var fs = require('fs');
var url = require('url');
// var handleRequest = module.exports.handleRequest
// var handleRequest = require("./request-handler");


// heroku

// var port = Number(process.env.PORT || 5000);
// var server = http.createServer(handleRequest.handler);
// server.listen(port);

// local test

var port = 8000;
var server = http.createServer(function(req, res) {
  var urlParts = url.parse(req.url).pathname;
  if (urlParts === '/') {
    urlParts = '/index.html';
  }
  var filePath = './client/client' + urlParts;
  console.log(filePath);
  fs.readFile(filePath, function(err, data) {
    if (!err) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    } else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('errrorooooorrr');
    }
  });

});
// var server = http.createServer(handleRequest.handler);
var ip = '127.0.0.1';
server.listen(port, ip);
console.log("Listening on http://" + ip + ":" + port);
/* Import node's http module: */


// express 

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/../client/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.saveMessages = function(data) {
  data = JSON.stringify(data) + ';';
  fs.appendFile('./server/messages.txt', data, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('saved successfully');
    }
  });
};

app.readMessages = function() {
  var data = {};
  var jsonString = fs.readFileSync('./server/messages.txt');
  data.results = String.prototype.split.call(jsonString, ';');
  // cut off the empty item in the array, created by a trailing comma
  data.results.splice(data.results.length - 1);
  data.results = data.results.map(function(item) {
    return JSON.parse(item);
  });
  return data;
};

app.get('/classes/messages', function(req, res) {
  res.send(200, this.readMessages());
});

app.get('*', function(req, res) {
  res.send(404);
});

app.post('/classes/messages', function(req, res) {
  this.saveMessages(req.body);
  res.send(201, 'poseted successfully');
});

// enable to run locally
// app.listen(process.env.PORT || 3000);


// heroku

var port = Number(process.env.PORT || 5000);
app.listen(port);


// local test
  
  // var server = http.createServer(handleRequest.handler);
  // var http = require("http");
  // var url = require('url');
  // var handleRequest = module.exports.handleRequest
  // var handleRequest = require("./request-handler");
  // var port = 8000;
  // var server = http.createServer(function(req, res) {
  //   var urlParts = url.parse(req.url).pathname;
  //   if (urlParts === '/') {
  //     urlParts = '/index.html';
  //   }
  //   var filePath = './client/client' + urlParts;
  //   console.log(filePath);
  //   fs.readFile(filePath, function(err, data) {
  //     if (!err) {
  //       res.writeHead(200, {
  //         'Content-Type': 'text/html'
  //       });
  //       res.end(data);
  //     } else {
  //       res.writeHead(500, {
  //         'Content-Type': 'text/plain'
  //       });
  //       res.end('errrorooooorrr');
  //     }
  //   });
  // });
  // var server = http.createServer(handleRequest.handler);
  // var ip = '127.0.0.1';
  // server.listen(port, ip);
  // console.log("Listening on http://" + ip + ":" + port);
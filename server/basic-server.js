/* Import node's http module: */
var http = require("http");
// var handleRequest = module.exports.handleRequest
var handleRequest = require("./request-handler");


// heroku

var port = Number(process.env.PORT || 5000);
var server = http.createServer(handleRequest.handler);
server.listen(port);

// local test

// var port = 3000;
// var server = http.createServer(handleRequest.handler);
// var ip = '127.0.0.1';
// server.listen(port, ip);
// console.log("Listening on http://" + ip + ":" + port);


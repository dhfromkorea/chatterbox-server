/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */


var data = {
  'results': []
};
var handleRequest = function(request, response) {

  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };

  var headers = defaultCorsHeaders;

  if (request.url.indexOf('/classes/') !== -1) {
    if (request.method === 'GET') {
      headers['Content-Type'] = "application/json";
      response.writeHead(200, headers);
      response.end(JSON.stringify(data));
    } else if (request.method === 'POST') {
      headers['Content-Type'] = "application/json";
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
      });
      request.on('end', function() {
        // if ( request.url.substring( request.url.indexOf('?') + 1).length ) {
          data.results.push(JSON.parse(body));
        // } else {
          // var qs = require('querystring');
          // data.results.push(qs.parse(body));
        // }
        response.writeHead(201, headers);
        response.end('success');
      });
    }
  } else {
    headers['Content-Type'] = "text/plain";
    response.writeHead(404, headers);
    response.end("doesn't exist");
  }
};

module.exports.handler = handleRequest;
/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var data = {
  'results': []
};

var handleRequest = function(request, response) {
    // var url = require('url').parse(request.url);
    if ( request.url.indexOf('/classes/') !== -1 ) {
      if (request.method === 'GET') {
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(data));
      } else if (request.method === 'POST') {
        var qs = require('querystring');
        var body = '';
        request.on('data', function(chunk) {
          body += chunk;
        });
        request.on('end', function() {
          var postedData = qs.parse(body);
          data.results.push(postedData);
          response.writeHead(201, {
            'Content-Type': 'text/plain'
          });
          response.end('success');
        });
      }
    } else {
      var statusCode = 404;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = "text/plain";
      response.writeHead(statusCode, headers);
      response.end("doesn't exist");
    }
};

module.exports.handler = handleRequest;
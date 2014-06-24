var request = require('request');
var handler = require('../request-handler');
var basicServer = require('../basic-server').server;
var stubs = require('./Stubs');


var requestParams = {method: 'POST',
  uri: 'http://127.0.0.1:3000/classes/messages',
  json: {
    username: 'Jono',
    message: 'Do my bidding!'}
};

request(requestParams, function(error, response, body) {
	console.log('done: ' + response);
});
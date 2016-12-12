/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
/*
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
*/
var unirest = require('unirest');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var port = (appEnv.port || 8888);
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: port});


wss.on('connection', function(ws) {
    
    // do nothing
		  
});

wss.broadcast = function(data) {
	for (var i in wss.clients)
    	wss.clients[i].send(data);
};

setInterval(function(){
  unirest.get('https://twitterrest03.mybluemix.net/tweets')
  	.end(function(resp){
  		wss.broadcast(JSON.stringify(resp.body));		
  	});  
}, 2000);

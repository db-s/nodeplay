/***************************************************
 *
 * Module server.js
 *
 *
 * This module creates the node server and then
 * call the application's route module to point
 * to a controller and render the action of that
 * controller based on routes setting
 *
 ***************************************************/

var http = require('http');
var url = require('url');

exports.start = function (route, handle) {
	var port = 8000;
	var serverRequest = function(req, res) {
		// console.log(req.headers.host.split('.'));
		var pathname = url.parse(req.url).pathname;
		if (pathname !== '/favicon.ico') {
			console.log("Request received for - " + pathname);

			res.on("data", function(data) {
				// Do nothing
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			req.on("end", function() {
				// Do nothing
			});

			route(handle, pathname, res, req);
		}
	};

	http.createServer(serverRequest).listen(port);
	console.log("Server has started...");
}

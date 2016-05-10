/***************************************************
 *
 * Module index.js
 *
 *
 * This module starts the node server using server
 * module and then dispatch routes
 *
 * Command to start server: $ node index.js
 *
 ***************************************************/

var server = require('./server');
var dispatcher = require('./dispatcher');
var handle = require('./routes').routes;

server.start(dispatcher.route, handle);
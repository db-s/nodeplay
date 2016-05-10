/***************************************************
 *
 * Module routes.js
 *
 *
 * This module lists all possible routes user
 * wants in the application
 *
 * Following is the pattern of acceptable routes
 * 'PATH': ['CONTROLLER', 'ACTION', 'IS_AJAX?']
 *
 ***************************************************/

var requestHandlers = require('./requestHandlers');

exports.routes = {
  '/': 								['home', 'index'],
  '/home/test': 					['home', 'test'],
  '/player': 						['player', 'index'],
  '/player/play': 					['player', 'play', true],
  '/player/pause': 					['player', 'pause', true],
  '/player/resume': 				['player', 'resume', true],
  '/player/stop': 					['player', 'stop', true],
};

// TODO: Build workable custom routes
// exports.routes2 = {
//   '/':              requestHandlers.index,
//   '/start':         requestHandlers.start,
//   '/upload':        requestHandlers.upload,
//   '/show':          requestHandlers.show
// };

/***************************************************
 *
 * Module layoutHandler.js
 *
 *
 * This module lists functions for rendering
 * templates, JSON, error messages etc.
 *
 ***************************************************/

var fs = require('fs');
var swig = require('swig');
var tplPath = __dirname + '/templates';

exports.renderLayout = function(httpStatus, response, layout, args, contentType) {
  var content = null;
  var tpl = swig.compileFile(tplPath + '/' + layout);

  httpStatus = httpStatus || 200;
  args = args || {};
  contentType = contentType || 'text/html';
  content = tpl(args);

  response.writeHead(httpStatus, {'Content-Type': contentType});
  response.write(content);
  response.end();
};

exports.renderJSON = function(httpStatus, response, args) {
  var contentType = 'application/json';
  var content = null;

  httpStatus = httpStatus || 200;
  args = args || {};
  content = JSON.stringify(args);

  response.writeHead(httpStatus, {'Content-Type': contentType});
  response.write(content);
  response.end();
}

exports.renderError = function(httpStatus, response, message) {
  httpStatus = httpStatus || 404;
  message = typeof message === 'string' ? message : '';

  response.writeHead(httpStatus, {'Content-Type': 'text/plain'});
  response.write(message);
  response.end();
};

exports.tplExists = function(layout, cb) {
  var layoutPath = tplPath + '/' + layout;

  return fs.exists(layoutPath, function(exists) {
    cb(exists);
  });
};

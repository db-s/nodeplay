/***************************************************
 *
 * Module requestHandlers.js
 *
 *
 * This module lists functions of custom routes
 * listed in routes.js module and is being called
 * when user visits matching path
 *
 ***************************************************/

var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var layoutHandler = require('./layoutHandler');

exports.index = function (response) {
  layoutHandler.renderLayout(200, response, 'index.html');
}

exports.start = function (response) {
  layoutHandler.renderLayout(200, response, 'start.html');
};

exports.upload = function (response, request) {
  if (request.method.toLowerCase() === "post") {
    var form = new formidable.IncomingForm();
    var fileName = "/tmp/test.png";

    form.on('file', function(name, file) {
      console.log("File uploading...");
    });
    form.on('error', function(err) {
      console.log("Parse error...");
    });
    form.on('aborted', function() {
      console.log("Parse aborted...");
    });

    form.parse(request, function(err, fields, files) {
      layoutHandler.renderLayout(200, response, 'upload.html', {form_response: util.inspect({fields: fields, files: files})});
    });
  } else {
    layoutHandler.renderLayout(200, response, 'upload.html');
  }
};

exports.show = function (response, showData) {
  var filePath = "/tmp/test.png";

  fs.readFile(filePath, "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {"content-type": "text/plain"});
      console.log(error);
      response.write(JSON.stringify(error));
      response.end();
    } else {
      response.writeHead(200, {"content-type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
};

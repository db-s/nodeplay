/***************************************************
 *
 * Module dispatcher.js
 *
 *
 * This module matches requested path to existing
 * controller and action and then routes them
 * and render correct template for that action
 * if everything's alright and throws error
 * in case of missing controller, action or template
 *
 ***************************************************/

var controllerPath = './controllers/';
var layoutHandler = require('./layoutHandler');

exports.route = function(handle, pathname, response, request) {
	console.log("Routing request for " + pathname);
	var path = handle[pathname];

	/** TODO **/
	var str = "/usera123";
	var patt = new RegExp("/user.+");
	var patt_res = patt.test(str);
	/** END TODO **/

	if (typeof(path) !== "undefined") {
		var currentController = controllerPath + path[0] + 'Controller';
		var currentAction = path[1];
		var dispatchAction = require(currentController);
		
		if (path.length === 3) {
			// Check if the path is for ajax request
			if (path[2] === true) {
				return layoutHandler.renderLayout(200, response, false, dispatchAction[currentAction](request, response));
			} else {
				return layoutHandler.renderLayout(404, response, false, "Request error");
			}
		} else {
			var viewTpl = path.join('/') + '.html';

			layoutHandler.tplExists(viewTpl, function(res) {
				if (res === true) {
					return layoutHandler.renderLayout(200, response, viewTpl, dispatchAction[currentAction](request, response));
				} else {
					return layoutHandler.renderError(404, response, "Template for '"+pathname+"' is missing.");
				}
			});
		}
	} else {
		console.log("No request handler found for " + pathname);
		return layoutHandler.renderError(404, response, "404 Not found! You might try adding a route for this url.");
	}
};

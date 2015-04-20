'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bands = require('../../app/controllers/bands.server.controller');

	// Bands Routes
	app.route('/bands')
		.get(users.requiresLogin, bands.hasAuthorization, bands.list);

	app.route('/bands/:bandId')
		.get(users.requiresLogin, bands.hasAuthorization, bands.read)
		.put(users.requiresLogin, bands.hasAuthorization, bands.update);
		

	// Finish by binding the Band middleware
	app.param('bandId', bands.bandByID);
};

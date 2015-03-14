'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var concertbandapps = require('../../app/controllers/concertbandapps.server.controller');

	// Concertbandapps Routes
	app.route('/concertbandapps')
		.get(concertbandapps.list)
		.post(users.requiresLogin, concertbandapps.create);

	app.route('/concertbandapps/:concertbandappId')
		.get(concertbandapps.read)
		.put(users.requiresLogin, concertbandapps.hasAuthorization, concertbandapps.update)
		.delete(users.requiresLogin, concertbandapps.hasAuthorization, concertbandapps.delete);

	// Finish by binding the Concertbandapp middleware
	app.param('concertbandappId', concertbandapps.concertbandappByID);
};

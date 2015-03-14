'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var marchingbandapps = require('../../app/controllers/marchingbandapps.server.controller');

	// Marchingbandapps Routes
	app.route('/marchingbandapps')
		.get(marchingbandapps.list)
		.post(users.requiresLogin, marchingbandapps.create);

	app.route('/marchingbandapps/:marchingbandappId')
		.get(marchingbandapps.read)
		.put(users.requiresLogin, marchingbandapps.hasAuthorization, marchingbandapps.update)
		.delete(users.requiresLogin, marchingbandapps.hasAuthorization, marchingbandapps.delete);

	// Finish by binding the Marchingbandapp middleware
	app.param('marchingbandappId', marchingbandapps.marchingbandappByID);
};

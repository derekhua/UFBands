'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
        var userAccept = require('../../app/controllers/users/users.admin.server.controller');
	var bandapplications = require('../../app/controllers/bandapplications.server.controller');

	// Bandapplications Routes
	app.route('/bandapplications')
		.get(users.requiresLogin, users.hasAdminAuthorization, bandapplications.list)
		.post(users.requiresLogin, bandapplications.create)
		.put(users.requiresLogin, users.hasAdminAuthorization, users.update);

	app.route('/bandapplications/:bandapplicationId')
		.get(bandapplications.read)
                .put(userAccept.acceptApp)
		.delete(users.requiresLogin, bandapplications.hasAuthorization, bandapplications.delete);

	// Finish by binding the Bandapplication middleware
	app.param('bandapplicationId', bandapplications.bandapplicationByID);
};

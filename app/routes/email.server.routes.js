'use strict';

module.exports = function(app) {
	// Routing logic   
	var email = require('../../app/controllers/email.server.controller.js');
	app.route('/email/instrumentRepairEmail').post(email.instrumentRepair);
        app.route('/email/uniformRepairEmail').post(email.uniformRepair);
};
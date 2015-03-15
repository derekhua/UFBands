'use strict';

module.exports = function(app) {
	// Routing logic   
	var email = require('../../app/controllers/email.server.controller.js');


	app.route('/email/repairEmail').post(email.emailTest);
};
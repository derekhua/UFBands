'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Marchingbandapp = mongoose.model('Marchingbandapp'),
	_ = require('lodash');

/**
 * Create a Marchingbandapp
 */
exports.create = function(req, res) {
	var marchingbandapp = new Marchingbandapp(req.body);
	marchingbandapp.user = req.user;

	marchingbandapp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marchingbandapp);
		}
	});
};

/**
 * Show the current Marchingbandapp
 */
exports.read = function(req, res) {
	res.jsonp(req.marchingbandapp);
};

/**
 * Update a Marchingbandapp
 */
exports.update = function(req, res) {
	var marchingbandapp = req.marchingbandapp ;

	marchingbandapp = _.extend(marchingbandapp , req.body);

	marchingbandapp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marchingbandapp);
		}
	});
};

/**
 * Delete an Marchingbandapp
 */
exports.delete = function(req, res) {
	var marchingbandapp = req.marchingbandapp ;

	marchingbandapp.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marchingbandapp);
		}
	});
};

/**
 * List of Marchingbandapps
 */
exports.list = function(req, res) { 
	Marchingbandapp.find().sort('-created').populate('user', 'displayName').exec(function(err, marchingbandapps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marchingbandapps);
		}
	});
};

/**
 * Marchingbandapp middleware
 */
exports.marchingbandappByID = function(req, res, next, id) { 
	Marchingbandapp.findById(id).populate('user', 'displayName').exec(function(err, marchingbandapp) {
		if (err) return next(err);
		if (! marchingbandapp) return next(new Error('Failed to load Marchingbandapp ' + id));
		req.marchingbandapp = marchingbandapp ;
		next();
	});
};

/**
 * Marchingbandapp authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.marchingbandapp.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

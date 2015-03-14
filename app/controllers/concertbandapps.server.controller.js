'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Concertbandapp = mongoose.model('Concertbandapp'),
	_ = require('lodash');

/**
 * Create a Concertbandapp
 */
exports.create = function(req, res) {
	var concertbandapp = new Concertbandapp(req.body);
	concertbandapp.user = req.user;

	concertbandapp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concertbandapp);
		}
	});
};

/**
 * Show the current Concertbandapp
 */
exports.read = function(req, res) {
	res.jsonp(req.concertbandapp);
};

/**
 * Update a Concertbandapp
 */
exports.update = function(req, res) {
	var concertbandapp = req.concertbandapp ;

	concertbandapp = _.extend(concertbandapp , req.body);

	concertbandapp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concertbandapp);
		}
	});
};

/**
 * Delete an Concertbandapp
 */
exports.delete = function(req, res) {
	var concertbandapp = req.concertbandapp ;

	concertbandapp.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concertbandapp);
		}
	});
};

/**
 * List of Concertbandapps
 */
exports.list = function(req, res) { 
	Concertbandapp.find().sort('-created').populate('user', 'displayName').exec(function(err, concertbandapps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concertbandapps);
		}
	});
};

/**
 * Concertbandapp middleware
 */
exports.concertbandappByID = function(req, res, next, id) { 
	Concertbandapp.findById(id).populate('user', 'displayName').exec(function(err, concertbandapp) {
		if (err) return next(err);
		if (! concertbandapp) return next(new Error('Failed to load Concertbandapp ' + id));
		req.concertbandapp = concertbandapp ;
		next();
	});
};

/**
 * Concertbandapp authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.concertbandapp.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

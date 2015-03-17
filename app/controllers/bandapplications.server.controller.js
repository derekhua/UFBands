'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bandapplication = mongoose.model('Bandapplication'),
	_ = require('lodash');

/**
 * Create a Bandapplication
 */
exports.create = function(req, res) {
	var bandapplication = new Bandapplication(req.body);
	bandapplication.user = req.user;

	bandapplication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bandapplication);
		}
	});
};

/**
 * Show the current Bandapplication
 */
exports.read = function(req, res) {
	res.jsonp(req.bandapplication);
};

/**
 * Update a Bandapplication
 */
exports.update = function(req, res) {
	var bandapplication = req.bandapplication ;

	bandapplication = _.extend(bandapplication , req.body);

	bandapplication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bandapplication);
		}
	});
};

/**
 * Delete an Bandapplication
 */
exports.delete = function(req, res) {
	var bandapplication = req.bandapplication ;

	bandapplication.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bandapplication);
		}
	});
};

/**
 * List of Bandapplications
 */
exports.list = function(req, res) { 
	Bandapplication.find().sort('-created').populate('user', 'displayName').exec(function(err, bandapplications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bandapplications);
		}
	});
};

/**
 * Bandapplication middleware
 */
exports.bandapplicationByID = function(req, res, next, id) { 
	Bandapplication.findById(id).populate('user', 'displayName').exec(function(err, bandapplication) {
		if (err) return next(err);
		if (! bandapplication) return next(new Error('Failed to load Bandapplication ' + id));
		req.bandapplication = bandapplication ;
		next();
	});
};

/**
 * Bandapplication authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bandapplication.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

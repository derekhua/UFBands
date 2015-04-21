'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Band = mongoose.model('Band'),
	_ = require('lodash');
/**
 * Show the current Band
 */
exports.read = function(req, res) {
	res.jsonp(req.band);
};

/**
 * Update a Band
 */
exports.update = function(req, res) {
	var band = req.band ;

	band = _.extend(band , req.body);
	console.log('Start Date: '+band.startDate);
	band.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(band);
		}
	});
};

/**
 * List of Bands
 */
exports.list = function(req, res) { 
	Band.find().exec(function(err, bands) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bands);
		}
	});
};

/**
 * Band middleware
 */
exports.bandByID = function(req, res, next, id) { 
	Band.findById(id).exec(function(err, band) {
		if (err) {
			return next(err);
		}
		if (! band) return next(new Error('Failed to load Band ' + id));
		req.band = band;
		next();
	});
};

/**
 * Band authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.user.roles !== 'admin') {

		return res.status(403).send('User is not authorized');
	}
	next();
};

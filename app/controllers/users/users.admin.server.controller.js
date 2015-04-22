'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
	_ = require('lodash');


exports.acceptApp = function(req, res) {
	// Init Variables
	var user = req.user;
	console.log('accept app');
        console.log(req.user);
        var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
                                console.log('inside admin');
				res.json(user);
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};



exports.listRoster = function(req, res) { 
    if( req.query['send'] === 'Marching Band' ){
	User.find({
                    "MemberOf.march": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
    if( req.query['send'] === 'Jazz Band' ){
	User.find({
                    "MemberOf.jazz": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
        if( req.query['send'] === 'Wind Symphony' ){
	User.find({
                    "MemberOf.wind": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
        if( req.query['send'] === 'Symphonic Band' ){
	User.find({
                    "MemberOf.symph": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
        if( req.query['send'] === 'Basketball Pep Band' ){
	User.find({
                    "MemberOf.bball_pep": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
        if( req.query['send'] === 'Volleyball Pep Band' ){
	User.find({
                    "MemberOf.volley_pep": true
                }).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
    }
};

/**
 * List of Moderators
 */
exports.listMods = function(req, res) { 
	User.find({roles: 'moderator'}).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};

exports.readMod = function(req, res) {
	req.mod.password = ''; //hide current password
	res.jsonp(req.mod);
};

/**
 * Update a Bandapplication
 */
exports.updateMod = function(req, res) {
	var mod = req.mod ;
	mod = _.extend(mod , req.body);
	mod.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mod);
		}
	});
};

/**
 * Admin middleware
 */
exports.modByType = function(req, res, next, modType) {
	User.findOne({userType: modType}).exec(function(err, mod) {
		if (err) {
			return next(err);
		}
		if (!mod){
			return next(new Error('Failed to find ' + modType + ' mod'));
		}
		req.mod = mod;
		next();
	});
};

/**
 * Band authorization middleware
 */
exports.hasAdminAuthorization = function(req, res, next) {
	if (req.user.roles !== 'admin') {

		return res.status(403).send('User is not authorized');
	}
	next();
};
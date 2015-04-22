'use strict';
/*jshint quotmark: false */
/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('../../config/config'),
	//nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	mandrill = require('mandrill-api/mandrill'),
	m = new mandrill.Mandrill('CCnTa8i5FPxbhgkkNLOYzw');
/**
 * Create a Email
 */

exports.instrumentRepair = function(req, res) {	
                    var message = {
                        "message": {
                            "from_email":"cen3031uf@gmail.com",
                            "from_name": "Instrument Repair Request",
                            "to":[{"email":"cen3031uf@gmail.com"}],
                            "subject": "Instrument Repair for " + req.user.displayName,
                            "text": req.body.instrument + " repair needed" + "\nID of instrument needing repairs: " + req.body.ID + "\nName: " + req.user.displayName + "\nDescription of damage: " + req.body.description
                            
                        }

                     };		
			m.messages.send(message, function(result) {
				console.log(result);			
				return;
			}, function() {
	    			// Mandrill returns the error as an object with name and message keys
	    			console.log('A mandrill error occurred');
	    	});
};
exports.uniformRepair = function(req, res) {	
                    var message = {
                        "message": {
                            "from_email":"cen3031uf@gmail.com",
                            "from_name": "Uniform Repair Request",
                            "to":[{"email":"cen3031uf@gmail.com"}],
                            "subject": "Uniform Repair for " + req.user.displayName,
                            "text": "Uniform repair request for " + req.user.displayName + "\nUniform ID: " + req.body.ID + "\nDescription of damage: " + req.body.description       
                        }
                     };		
			m.messages.send(message, function(result) {
				console.log(result);			
				return;
			}, function() {
	    			// Mandrill returns the error as an object with name and message keys
	    			console.log('A mandrill error occurred');
	    	});
};
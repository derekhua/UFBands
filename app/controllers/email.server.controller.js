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
	    			console.log('A mandrill error occurred: ');
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
	    			console.log('A mandrill error occurred: ');
	    	});
};
exports.resultMail = function(req, res, next) {
	// Init Variables
	var message = null;
	async.waterfall([
		function(done) {
			Order.findOne({result: req.body.result_id}).exec(function(err, order){
				if (err) 
				{
					return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
					});
				} else {
					User.findOne({_id: order.user}).exec(function(err, user){
						if (err) 
						{
							return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
							});
						} else {
							done(err, user);
						}
					});
				}			
			});
		},
		function(user, done) {
			res.render('templates/complete-result-email', {
				name: user.displayName,
				appName: config.app.title,
				url: 'localhost:3000/customer/'
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send email using service
		function(emailHTML, user, done) {			
			var message = {
	    		'html': emailHTML,
	    		'subject': 'Test Complete',
	    		'from_email': 'cen3031uf@gmail.com',
	    		'from_name': 'Customer Support',
	    		'to': [{
	            	'email': user.email,
	            	'name': 'Recipient Name',
	            	'type': 'to'
	    		}],
	    		'headers': {
	        		'Reply-To': 'cen3031uf@gmail.com'
	    		}
	    	};			
			var async = true;
			var ip_pool = '587';
			mandrill_client.messages.send({'message': message, 'async': async, 'ip_pool': ip_pool}, function(result) {
				console.log(result);			
				return;
			}, function(e) {
	    			// Mandrill returns the error as an object with name and message keys
	    			console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    	});
		}
	]);
};
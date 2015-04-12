'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			size: 'm'
		});
		user2 = new User({
			size: 'l'
		});

		done();
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
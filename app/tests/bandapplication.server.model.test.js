'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bandapplication = mongoose.model('Bandapplication');

/**
 * Globals
 */
var user, bandapplication;

/**
 * Unit tests
 */
describe('Bandapplication Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			bandapplication = new Bandapplication({
				name: 'Bandapplication Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return bandapplication.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			bandapplication.name = '';

			return bandapplication.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Bandapplication.remove().exec();
		User.remove().exec();

		done();
	});
});
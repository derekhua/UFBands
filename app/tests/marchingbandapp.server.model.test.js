'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Marchingbandapp = mongoose.model('Marchingbandapp');

/**
 * Globals
 */
var user, marchingbandapp;

/**
 * Unit tests
 */
describe('Marchingbandapp Model Unit Tests:', function() {
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
			marchingbandapp = new Marchingbandapp({
				name: 'Marchingbandapp Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return marchingbandapp.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			marchingbandapp.name = '';

			return marchingbandapp.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Marchingbandapp.remove().exec();
		User.remove().exec();

		done();
	});
});
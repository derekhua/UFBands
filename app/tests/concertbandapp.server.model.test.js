'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Concertbandapp = mongoose.model('Concertbandapp');

/**
 * Globals
 */
var user, concertbandapp;

/**
 * Unit tests
 */
describe('Concertbandapp Model Unit Tests:', function() {
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
			concertbandapp = new Concertbandapp({
				name: 'Concertbandapp Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return concertbandapp.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			concertbandapp.name = '';

			return concertbandapp.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Concertbandapp.remove().exec();
		User.remove().exec();

		done();
	});
});
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
			phoneNumber: '5613862573',
			gatorlink: 'test@ufl.edu',
			email: 'test@ufl.edu',
			primary: 'Baritone',
			permanentAddress: ['test', '', 'test', 'FL', '32601'],
			localAddress: ['test', '', 'test', 'FL', '32601'],
			highSchool: 'test',
			graduationDate: '2011',
			class: '3EG',
			major: 'Band',
			year: 'freshman',
      userType: 'Current',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user.save(function() {
			bandapplication = new Bandapplication({
				user: user,
				drumlineRank: [0,0,0,0] 
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

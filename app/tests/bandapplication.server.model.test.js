'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bandapplication = mongoose.model('Bandapplication'),
	Band						=	mongoose.model('Band');

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
				band: new Band({
					name: 'Alumni Band',
					startDate: new Date(2015, 3, 25),
					endDate: new Date(2015, 3, 26),
					openDate: new Date(2015, 3, 12),
					closeDate: new Date(2015, 3, 14),
				}),
				drumlineRank: [1,2,3,4]
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

		it('should be able to show an error when try to save without user', function(done) {
			bandapplication.user = '';

			return bandapplication.save(function(err) {
				should.exist(err);
				done();
			});
		});

/*		it('should be able to show an error when try to save without band', function(done) {
			bandapplication.band = '';

			return bandapplication.save(function(err) {
				should.exist(err);
				done();
			});
		});*/

		it('should be able to show an error when try to save without drumline rank', function(done) {
			bandapplication.drumlineRank = '';

			return bandapplication.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without proper drumline rank', function(done) {
			bandapplication.drumlineRank = [0, 0, 0, 0];

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

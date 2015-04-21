'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Music = mongoose.model('Music');

/**
 * Globals
 */
var user, music;

/**
 * Unit tests
 */
describe('Music Model Unit Tests:', function() {
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
			music = new Music({
				title: 'Music Name',
				path: 'path',
				composer: 'mozart',
				instrument: 'baritone',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return music.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			music.title = '';

			return music.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without file path', function(done) {
			music.path = '';

			return music.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without composer', function(done) {
			music.composer = '';

			return music.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without instrument', function(done) {
			music.instrument = '';

			return music.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		Music.remove().exec();
		User.remove().exec();

		done();
	});
});

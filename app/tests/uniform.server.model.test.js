'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Uniform	=	mongoose.model('Uniform'),
	Size = mongoose.model('Size');

/**
 * Globals
 */
var user, uniform;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
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
			roles: 'admin',
			provider: 'local'
		});

		user.save(function() {
			uniform	=	new Uniform({
				bandName: 'alumni band',
				shirtSize: new Size({
						size: 's'
				}),
				user: user
			});
			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return uniform.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should not be able to save without band name', function(done) {
			uniform.bandName	=	'';

			return uniform.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not be able to save without user', function(done) {
			uniform.user	=	'';

			return uniform.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not be able to save without shirtSize', function(done) {
			uniform.shirtSize.size	=	'';

			return uniform.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	after(function(done) {
		User.remove().exec();
		Uniform.remove().exec();
		done();
	});
});

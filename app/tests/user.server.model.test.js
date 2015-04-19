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


		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			return user.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should fail to save an existing user again', function(done) {
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without phone number', function(done) {
			user.phoneNumber = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without gatorlink', function(done) {
			user.gatorlink = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without email', function(done) {
			user.email = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without primary instrument', function(done) {
			user.primary = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without high school', function(done) {
			user.highSchool = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without graduation data', function(done) {
			user.graduationDate = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without class', function(done) {
			user.class = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without major', function(done) {
			user.major = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without year', function(done) {
			user.year = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without user type', function(done) {
			user.userType = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without username', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without password', function(done) {
			user.password = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});


	});



	after(function(done) {
		User.remove().exec();
		done();
	});
});

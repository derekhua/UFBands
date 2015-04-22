'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Band =	mongoose.model('Band');

/**
 * Globals
 */
var user, band;

/**
 * Unit tests
 */
describe('Band Model Unit Tests:', function() {
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
			roles: 'admin',
			provider: 'local'
		});

		user.save(function() {

				band =  new Band({
					name: 'Alumni Band',
					startDate: new Date(2015, 3, 25),
					endDate: new Date(2015, 3, 26),
					openDate: new Date(2015, 3, 12),
					closeDate: new Date(2015, 3, 14),
				});
			done();
		});
	});

  describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return band.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			band.name = '';

			return band.save(function(err) {
				should.exist(err);
				done();
			});
		});

    it('should be able to show an error when try to save without enum name', function(done) {
      band.name = 'Mnupssksksk';

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without start date', function(done) {
      band.startDate = '';

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without end date', function(done) {
      band.endDate = '';

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without open date', function(done) {
      band.openDate = '';

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without close date', function(done) {
      band.closeDate = '';

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when start date after close date', function(done) {
      band.startDate = new Date(2015,4,15);

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when end date before start date', function(done) {
      band.endDate = new Date(2015,2,15);

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when open date after close date', function(done) {
      band.openDate = new Date(2015,4,15);

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when close date before open date', function(done) {
      band.closeDate = new Date(2015,2,15);

      return band.save(function(err) {
        should.exist(err);
        done();
      });
    });

	});

	afterEach(function(done) {
		Band.remove().exec();
		User.remove().exec();

		done();
	});
});

'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server.js'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bandapplication = mongoose.model('Bandapplication'),
	Band	=	mongoose.model('Band'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bandapplication;

/**
 * Bandapplication routes tests
 */
describe('Bandapplication CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
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
			username: credentials.username,
			password: credentials.password,
			roles: 'admin',
			provider: 'local'
		});

		// Save a user to the test db and create new Bandapplication
		user.save(function() {
			bandapplication = new Bandapplication({
				user: user,
				band: new Band({
					name: 'Alumni Band',
					startDate: new Date(115, 3, 25),
					endDate: new Date(115, 3, 26),
					openDate: new Date(115, 3, 12),
					closeDate: new Date(115, 3, 14),
				}),
				drumlineRank: [1,2,3,4]
			});
			done();
		});
	});

	it('should be able to save Bandapplication instance if logged in', function(done) {
			agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bandapplication
				agent.post('/bandapplications')
					.send(bandapplication)
					.expect(200)
					.end(function(bandapplicationSaveErr, bandapplicationSaveRes) {
						// Handle Bandapplication save error
						if (bandapplicationSaveErr) done(bandapplicationSaveErr);

						// Get a list of Bandapplications
						agent.get('/bandapplications')
							.end(function(bandapplicationsGetErr, bandapplicationsGetRes) {
								// Handle Bandapplication save error
								if (bandapplicationsGetErr) done(bandapplicationsGetErr);

								// Get Bandapplications list
								var bandapplications = bandapplicationsGetRes.body;

								// Set assertions
								(bandapplications[0].user._id).should.equal(userId);
//								(bandapplications[0].name).should.match('Bandapplication Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bandapplication instance if not logged in', function(done) {
		agent.post('/bandapplications')
			.send(bandapplication)
			.expect(401)
			.end(function(bandapplicationSaveErr, bandapplicationSaveRes) {
				// Call the assertion callback
				done(bandapplicationSaveErr);
			});
	});

	it('should not be able to save Bandapplication instance if no ranking is provided', function(done) {
		// Invalidate name field
		bandapplication.drumlineRank = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bandapplication
				agent.post('/bandapplications')
					.send(bandapplication)
					.expect(400)
					.end(function(bandapplicationSaveErr, bandapplicationSaveRes) {
						// Set message assertion
//						(bandapplicationSaveRes.body.message).should.match('Please fill Bandapplication name');

						// Handle Bandapplication save error
						done(bandapplicationSaveErr);
					});
			});
	});

	it('should be able to update Bandapplication instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bandapplication
				agent.post('/bandapplications')
					.send(bandapplication)
					.expect(200)
					.end(function(bandapplicationSaveErr, bandapplicationSaveRes) {
						// Handle Bandapplication save error
						if (bandapplicationSaveErr) done(bandapplicationSaveErr);

						// Update Bandapplication name
						bandapplication.user = user;

						// Update existing Bandapplication
						agent.put('/bandapplications/' + bandapplicationSaveRes.body._id)
							.send(bandapplication)
							.expect(200)
							.end(function(bandapplicationUpdateErr, bandapplicationUpdateRes) {
								// Handle Bandapplication update error
								if (bandapplicationUpdateErr) done(bandapplicationUpdateErr);

								// Set assertions
//								(bandapplicationUpdateRes.body._id).should.equal(bandapplicationSaveRes.body._id);
//								(bandapplicationUpdateRes.body.user).should.match(user);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bandapplications if not signed in', function(done) {
		// Create new Bandapplication model instance
		var bandapplicationObj = bandapplication;

		// Save the Bandapplication
		bandapplicationObj.save(function() {
			// Request Bandapplications
			request(app).get('/bandapplications')
				.end(function(req, res) {
					// Set assertion
//					res.body.should.be.an.Array.with.lengthOf(21);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bandapplication if not signed in', function(done) {
		// Create new Bandapplication model instance
		var bandapplicationObj = bandapplication;

		// Save the Bandapplication
		bandapplicationObj.save(function() {
			request(app).get('/bandapplications/' + bandapplicationObj._id)
				.end(function(req, res) {
					// Set assertion
//					res.body.should.be.an.Object.with.property('Alumni Band', bandapplication.band.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bandapplication instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bandapplication
				agent.post('/bandapplications')
					.send(bandapplication)
					.expect(200)
					.end(function(bandapplicationSaveErr, bandapplicationSaveRes) {
						// Handle Bandapplication save error
						if (bandapplicationSaveErr) done(bandapplicationSaveErr);

						// Delete existing Bandapplication
						agent.delete('/bandapplications/' + bandapplicationSaveRes.body._id)
							.send(bandapplication)
							.expect(200)
							.end(function(bandapplicationDeleteErr, bandapplicationDeleteRes) {
								// Handle Bandapplication error error
								if (bandapplicationDeleteErr) done(bandapplicationDeleteErr);

								// Set assertions
								(bandapplicationDeleteRes.body._id).should.equal(bandapplicationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bandapplication instance if not signed in', function(done) {
		// Set Bandapplication user
		bandapplication.user = user;

		// Create new Bandapplication model instance
		var bandapplicationObj = new Bandapplication(bandapplication);

		// Save the Bandapplication
		bandapplicationObj.save(function() {
			// Try deleting Bandapplication
			request(app).delete('/bandapplications/' + bandapplicationObj._id)
			.expect(401)
			.end(function(bandapplicationDeleteErr, bandapplicationDeleteRes) {
				// Set message assertion
				(bandapplicationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bandapplication error error
				done(bandapplicationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		Bandapplication.remove().exec();
		User.remove().exec();
		done();
	});
});

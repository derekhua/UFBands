'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Marchingbandapp = mongoose.model('Marchingbandapp'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, marchingbandapp;

/**
 * Marchingbandapp routes tests
 */
describe('Marchingbandapp CRUD tests', function() {
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
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Marchingbandapp
		user.save(function() {
			marchingbandapp = {
				name: 'Marchingbandapp Name'
			};

			done();
		});
	});

	it('should be able to save Marchingbandapp instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marchingbandapp
				agent.post('/marchingbandapps')
					.send(marchingbandapp)
					.expect(200)
					.end(function(marchingbandappSaveErr, marchingbandappSaveRes) {
						// Handle Marchingbandapp save error
						if (marchingbandappSaveErr) done(marchingbandappSaveErr);

						// Get a list of Marchingbandapps
						agent.get('/marchingbandapps')
							.end(function(marchingbandappsGetErr, marchingbandappsGetRes) {
								// Handle Marchingbandapp save error
								if (marchingbandappsGetErr) done(marchingbandappsGetErr);

								// Get Marchingbandapps list
								var marchingbandapps = marchingbandappsGetRes.body;

								// Set assertions
								(marchingbandapps[0].user._id).should.equal(userId);
								(marchingbandapps[0].name).should.match('Marchingbandapp Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Marchingbandapp instance if not logged in', function(done) {
		agent.post('/marchingbandapps')
			.send(marchingbandapp)
			.expect(401)
			.end(function(marchingbandappSaveErr, marchingbandappSaveRes) {
				// Call the assertion callback
				done(marchingbandappSaveErr);
			});
	});

	it('should not be able to save Marchingbandapp instance if no name is provided', function(done) {
		// Invalidate name field
		marchingbandapp.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marchingbandapp
				agent.post('/marchingbandapps')
					.send(marchingbandapp)
					.expect(400)
					.end(function(marchingbandappSaveErr, marchingbandappSaveRes) {
						// Set message assertion
						(marchingbandappSaveRes.body.message).should.match('Please fill Marchingbandapp name');
						
						// Handle Marchingbandapp save error
						done(marchingbandappSaveErr);
					});
			});
	});

	it('should be able to update Marchingbandapp instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marchingbandapp
				agent.post('/marchingbandapps')
					.send(marchingbandapp)
					.expect(200)
					.end(function(marchingbandappSaveErr, marchingbandappSaveRes) {
						// Handle Marchingbandapp save error
						if (marchingbandappSaveErr) done(marchingbandappSaveErr);

						// Update Marchingbandapp name
						marchingbandapp.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Marchingbandapp
						agent.put('/marchingbandapps/' + marchingbandappSaveRes.body._id)
							.send(marchingbandapp)
							.expect(200)
							.end(function(marchingbandappUpdateErr, marchingbandappUpdateRes) {
								// Handle Marchingbandapp update error
								if (marchingbandappUpdateErr) done(marchingbandappUpdateErr);

								// Set assertions
								(marchingbandappUpdateRes.body._id).should.equal(marchingbandappSaveRes.body._id);
								(marchingbandappUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Marchingbandapps if not signed in', function(done) {
		// Create new Marchingbandapp model instance
		var marchingbandappObj = new Marchingbandapp(marchingbandapp);

		// Save the Marchingbandapp
		marchingbandappObj.save(function() {
			// Request Marchingbandapps
			request(app).get('/marchingbandapps')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Marchingbandapp if not signed in', function(done) {
		// Create new Marchingbandapp model instance
		var marchingbandappObj = new Marchingbandapp(marchingbandapp);

		// Save the Marchingbandapp
		marchingbandappObj.save(function() {
			request(app).get('/marchingbandapps/' + marchingbandappObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', marchingbandapp.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Marchingbandapp instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Marchingbandapp
				agent.post('/marchingbandapps')
					.send(marchingbandapp)
					.expect(200)
					.end(function(marchingbandappSaveErr, marchingbandappSaveRes) {
						// Handle Marchingbandapp save error
						if (marchingbandappSaveErr) done(marchingbandappSaveErr);

						// Delete existing Marchingbandapp
						agent.delete('/marchingbandapps/' + marchingbandappSaveRes.body._id)
							.send(marchingbandapp)
							.expect(200)
							.end(function(marchingbandappDeleteErr, marchingbandappDeleteRes) {
								// Handle Marchingbandapp error error
								if (marchingbandappDeleteErr) done(marchingbandappDeleteErr);

								// Set assertions
								(marchingbandappDeleteRes.body._id).should.equal(marchingbandappSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Marchingbandapp instance if not signed in', function(done) {
		// Set Marchingbandapp user 
		marchingbandapp.user = user;

		// Create new Marchingbandapp model instance
		var marchingbandappObj = new Marchingbandapp(marchingbandapp);

		// Save the Marchingbandapp
		marchingbandappObj.save(function() {
			// Try deleting Marchingbandapp
			request(app).delete('/marchingbandapps/' + marchingbandappObj._id)
			.expect(401)
			.end(function(marchingbandappDeleteErr, marchingbandappDeleteRes) {
				// Set message assertion
				(marchingbandappDeleteRes.body.message).should.match('User is not logged in');

				// Handle Marchingbandapp error error
				done(marchingbandappDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Marchingbandapp.remove().exec();
		done();
	});
});
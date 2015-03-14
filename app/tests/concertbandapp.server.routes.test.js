'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Concertbandapp = mongoose.model('Concertbandapp'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, concertbandapp;

/**
 * Concertbandapp routes tests
 */
describe('Concertbandapp CRUD tests', function() {
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

		// Save a user to the test db and create new Concertbandapp
		user.save(function() {
			concertbandapp = {
				name: 'Concertbandapp Name'
			};

			done();
		});
	});

	it('should be able to save Concertbandapp instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concertbandapp
				agent.post('/concertbandapps')
					.send(concertbandapp)
					.expect(200)
					.end(function(concertbandappSaveErr, concertbandappSaveRes) {
						// Handle Concertbandapp save error
						if (concertbandappSaveErr) done(concertbandappSaveErr);

						// Get a list of Concertbandapps
						agent.get('/concertbandapps')
							.end(function(concertbandappsGetErr, concertbandappsGetRes) {
								// Handle Concertbandapp save error
								if (concertbandappsGetErr) done(concertbandappsGetErr);

								// Get Concertbandapps list
								var concertbandapps = concertbandappsGetRes.body;

								// Set assertions
								(concertbandapps[0].user._id).should.equal(userId);
								(concertbandapps[0].name).should.match('Concertbandapp Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Concertbandapp instance if not logged in', function(done) {
		agent.post('/concertbandapps')
			.send(concertbandapp)
			.expect(401)
			.end(function(concertbandappSaveErr, concertbandappSaveRes) {
				// Call the assertion callback
				done(concertbandappSaveErr);
			});
	});

	it('should not be able to save Concertbandapp instance if no name is provided', function(done) {
		// Invalidate name field
		concertbandapp.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concertbandapp
				agent.post('/concertbandapps')
					.send(concertbandapp)
					.expect(400)
					.end(function(concertbandappSaveErr, concertbandappSaveRes) {
						// Set message assertion
						(concertbandappSaveRes.body.message).should.match('Please fill Concertbandapp name');
						
						// Handle Concertbandapp save error
						done(concertbandappSaveErr);
					});
			});
	});

	it('should be able to update Concertbandapp instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concertbandapp
				agent.post('/concertbandapps')
					.send(concertbandapp)
					.expect(200)
					.end(function(concertbandappSaveErr, concertbandappSaveRes) {
						// Handle Concertbandapp save error
						if (concertbandappSaveErr) done(concertbandappSaveErr);

						// Update Concertbandapp name
						concertbandapp.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Concertbandapp
						agent.put('/concertbandapps/' + concertbandappSaveRes.body._id)
							.send(concertbandapp)
							.expect(200)
							.end(function(concertbandappUpdateErr, concertbandappUpdateRes) {
								// Handle Concertbandapp update error
								if (concertbandappUpdateErr) done(concertbandappUpdateErr);

								// Set assertions
								(concertbandappUpdateRes.body._id).should.equal(concertbandappSaveRes.body._id);
								(concertbandappUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Concertbandapps if not signed in', function(done) {
		// Create new Concertbandapp model instance
		var concertbandappObj = new Concertbandapp(concertbandapp);

		// Save the Concertbandapp
		concertbandappObj.save(function() {
			// Request Concertbandapps
			request(app).get('/concertbandapps')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Concertbandapp if not signed in', function(done) {
		// Create new Concertbandapp model instance
		var concertbandappObj = new Concertbandapp(concertbandapp);

		// Save the Concertbandapp
		concertbandappObj.save(function() {
			request(app).get('/concertbandapps/' + concertbandappObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', concertbandapp.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Concertbandapp instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Concertbandapp
				agent.post('/concertbandapps')
					.send(concertbandapp)
					.expect(200)
					.end(function(concertbandappSaveErr, concertbandappSaveRes) {
						// Handle Concertbandapp save error
						if (concertbandappSaveErr) done(concertbandappSaveErr);

						// Delete existing Concertbandapp
						agent.delete('/concertbandapps/' + concertbandappSaveRes.body._id)
							.send(concertbandapp)
							.expect(200)
							.end(function(concertbandappDeleteErr, concertbandappDeleteRes) {
								// Handle Concertbandapp error error
								if (concertbandappDeleteErr) done(concertbandappDeleteErr);

								// Set assertions
								(concertbandappDeleteRes.body._id).should.equal(concertbandappSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Concertbandapp instance if not signed in', function(done) {
		// Set Concertbandapp user 
		concertbandapp.user = user;

		// Create new Concertbandapp model instance
		var concertbandappObj = new Concertbandapp(concertbandapp);

		// Save the Concertbandapp
		concertbandappObj.save(function() {
			// Try deleting Concertbandapp
			request(app).delete('/concertbandapps/' + concertbandappObj._id)
			.expect(401)
			.end(function(concertbandappDeleteErr, concertbandappDeleteRes) {
				// Set message assertion
				(concertbandappDeleteRes.body.message).should.match('User is not logged in');

				// Handle Concertbandapp error error
				done(concertbandappDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Concertbandapp.remove().exec();
		done();
	});
});
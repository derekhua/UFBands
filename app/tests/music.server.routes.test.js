'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Music = mongoose.model('Music'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, music;

/**
 * Music routes tests
 */
describe('Music CRUD tests', function() {
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

		// Save a user to the test db and create new Music
		user.save(function() {
			music = new Music({
				title: 'Music Name',
				path: 'path',
				composer: 'mozart',
				instrument: 'baritone',
				band: 'Jazz Band',
				user: user
			});

			done();
		});
	});

	it('should be able to save Music instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(200)
					.end(function(musicSaveErr, musicSaveRes) {
						// Handle Music save error
						if (musicSaveErr) done(musicSaveErr);

						// Get a list of Music
						agent.get('/music')
							.end(function(musicGetErr, musicGetRes) {
								// Handle Music save error
								if (musicGetErr) done(musicGetErr);

								// Get Music list
								var music = musicGetRes.body;

								// Set assertions
								(music[0].user._id).should.equal(userId);
								(music[0].title).should.match('Music Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Music instance if not logged in', function(done) {
		agent.post('/music')
			.send(music)
			.expect(401)
			.end(function(musicSaveErr, musicSaveRes) {
				// Call the assertion callback
				done(musicSaveErr);
			});
	});

	it('should not be able to save Music instance if no name is provided', function(done) {
		// Invalidate name field
		music.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(400)
					.end(function(musicSaveErr, musicSaveRes) {
						// Set message assertion
						(musicSaveRes.body.message).should.match('Please fill Music title');

						// Handle Music save error
						done(musicSaveErr);
					});
			});
	});

	it('should not be able to save Music instance if no composer is provided', function(done) {
		// Invalidate name field
		music.composer = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(400)
					.end(function(musicSaveErr, musicSaveRes) {
						// Set message assertion
						(musicSaveRes.body.message).should.match('Composer cannot be blank');

						// Handle Music save error
						done(musicSaveErr);
					});
			});
	});

	it('should not be able to save Music instance if file path is provided', function(done) {
		// Invalidate name field
		music.path = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(400)
					.end(function(musicSaveErr, musicSaveRes) {
						// Set message assertion
						(musicSaveRes.body.message).should.match('Must enter a file path');

						// Handle Music save error
						done(musicSaveErr);
					});
			});
	});

	it('should not be able to save Music instance if instrument is not provided', function(done) {
		// Invalidate name field
		music.instrument = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(400)
					.end(function(musicSaveErr, musicSaveRes) {
						// Set message assertion
						(musicSaveRes.body.message).should.match('Must specify an instrument');

						// Handle Music save error
						done(musicSaveErr);
					});
			});
	});

	it('should not be able to save Music instance if no band provided', function(done) {
		// Invalidate name field
		music.band = null;

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(400)
					.end(function(musicSaveErr, musicSaveRes) {
						// Set message assertion
						(musicSaveRes.body.message).should.match('Must specify band');

						// Handle Music save error
						done(musicSaveErr);
					});
			});
	});



	it('should be able to update Music instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(200)
					.end(function(musicSaveErr, musicSaveRes) {
						// Handle Music save error
						if (musicSaveErr) done(musicSaveErr);

						// Update Music name
						music.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Music
						agent.put('/music/' + musicSaveRes.body._id)
							.send(music)
							.expect(200)
							.end(function(musicUpdateErr, musicUpdateRes) {
								// Handle Music update error
								if (musicUpdateErr) done(musicUpdateErr);

								// Set assertions
								(musicUpdateRes.body._id).should.equal(musicSaveRes.body._id);
								(musicUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Music if not signed in', function(done) {
		// Create new Music model instance
		var musicObj = new Music(music);

		// Save the Music
		musicObj.save(function() {
			// Request Music
			request(app).get('/music')
				.end(function(req, res) {
					// Set assertion
//					res.body.should.be.an.Array.with.lengthOf(0);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Music if not signed in', function(done) {
		// Create new Music model instance
		var musicObj = new Music(music);

		// Save the Music
		musicObj.save(function() {
			request(app).get('/music/' + musicObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', music.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Music instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Music
				agent.post('/music')
					.send(music)
					.expect(200)
					.end(function(musicSaveErr, musicSaveRes) {
						// Handle Music save error
						if (musicSaveErr) done(musicSaveErr);

						// Delete existing Music
						agent.delete('/music/' + musicSaveRes.body._id)
							.send(music)
							.expect(200)
							.end(function(musicDeleteErr, musicDeleteRes) {
								// Handle Music error error
								if (musicDeleteErr) done(musicDeleteErr);

								// Set assertions
								(musicDeleteRes.body._id).should.equal(musicSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Music instance if not signed in', function(done) {
		// Set Music user
		music.user = user;

		// Create new Music model instance
		var musicObj = new Music(music);

		// Save the Music
		musicObj.save(function() {
			// Try deleting Music
			request(app).delete('/music/' + musicObj._id)
			.expect(401)
			.end(function(musicDeleteErr, musicDeleteRes) {
				// Set message assertion
				(musicDeleteRes.body.message).should.match('User is not logged in');

				// Handle Music error error
				done(musicDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Music.remove().exec();
		done();
	});
});

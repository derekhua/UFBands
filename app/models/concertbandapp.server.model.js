'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Concertbandapp Schema
 */
var ConcertbandappSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Concertbandapp name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Concertbandapp', ConcertbandappSchema);
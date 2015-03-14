'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Marchingbandapp Schema
 */
var MarchingbandappSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Marchingbandapp name',
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

mongoose.model('Marchingbandapp', MarchingbandappSchema);
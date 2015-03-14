'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Music Schema
 */
var MusicSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Music name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
        path: {
		type: String, //file path
		default: '',
		required: 'Must enter a file path'
 	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	instrument: {
		type: String,
		lowercase: true,
		default: '',
                trim: true,
		required: 'Must specify an instrument'
        }
});

mongoose.model('Music', MusicSchema);
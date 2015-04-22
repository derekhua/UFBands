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
	title: {
		type: String,
		default: '',
		required: 'Please fill Music title',
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
	composer: {
		type: String,
		default: '',
		trim: true,
		required: 'Composer cannot be blank'
	},
	instrument: {
		type: String,
		default: '',
    trim: true,
		required: 'Must specify an instrument'
        },
  band: {
    type: String,
    default: '',
    enum: [ 'Marching Band', 'Jazz Band', 'Wind Symphony', 'Symphonic Band', 'Basketball Pep Band', 'Volleyball Pep Band' ],
		required: 'Must specify band'
      }
});

mongoose.model('Music', MusicSchema);

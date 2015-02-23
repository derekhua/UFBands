'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MusicSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	instrument: {
		type: String,
		enum: ['piccolo', 'flute', 'clarinet', 'bass clarinet', 'contrabass clarinet', 'oboe', 'english horn', 'saxophone', 
		'alto saxophone', 'tenor saxophone', 'baritone saxophone', 'bassoon', 'contrabass bassoon'
		'french horn', 'horn', 'mellophone', 'trumpet', 'baritone', 'euphonium', 'trombone', 'bass trombone',
		'tuba', 'sousaphone', 'string bass', 'bass guitar', 'percussion', 'tenor', 'snare', 'cymbal', 'bass', 
		'quads', 'drumset', 'tympany', 'marimba', 'xylophone', 'chimes', 'piano']
		default: '',
		trim: true,
		lowercase: true,
		required: 'Must enter an instrument'
	},
	part: {
		type: [Number],
		min: 1
	}
	/**
	 * TO-DO: reference external folder
	 */
	ref: {
		type: String,
	}
});

mongoose.model('Music', MusicSchema);
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
	uploaded: {
		type: Date,
		default: Date.now
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
		required: 'Must specify an instrument',
		enum: ['piccolo', 'picc', 'flute', 'clarinet', 'oboe', 'english horn', 'basson', 'contrabass',
		'contrabass bassoon', 'sax', 'saxophone', 'alto saxophone', 'alto sax', 'alto', 'tenor saxophone', 
		'tenor sax', 'tenor', 'baritone saxophone', 'bari saxophone', 'bari sax', 'bari', 
		'french horn', 'horn', 'mellophone', 'mello', 'trumpet', 'cornet', 'baritone', 'euphonium', 'trombone',
		'bass trombone', 'tuba', 'sousaphone', 'string bass', 'bass', 'bass guitar', 'guitar',
		'percussion', 'bass drum', 'quads', 'tenors', 'snare', 'cymbals', 'triangle', 'tympany', 
		'marimba', 'vibraphone', 'xylophone', 'glockenspiel', 'drumset', 
		'celeste', 'celesta', 'piano', 'harp', 'bongos']
	},
	part: [Number]
});

mongoose.model('Music', MusicSchema);
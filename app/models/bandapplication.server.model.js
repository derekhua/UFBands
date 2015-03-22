'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var user = Schema.ObjectId.UserSchema;

var validatePhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * Bandapplication Schema
 */
var BandapplicationSchema = new Schema({
        // general info
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    // (admitted to Santa Fe, Innovation Academy, or attending another state school)
    status: {
        type: String,
        defualt: ''
    },
    // booleans that specify what bands this application is for
    marchingBand: {
        type: String,
        default: 'false'
    },
    concertEnsembles: {
        type: String,
        default: 'false'
    },
    jazzBand: {
        type: String,
        default: 'false'
    },
    volleyballPepBand: {
        type: String,
        default: 'false'
    },
    basketballPepBand: {
        type: String,
        default: 'false'
    },
    MBSecondary: {
        type: String,
        lowercase: true,
        default: ''
    },
    MBSecondaryYearsExp: {
        type: String,
        default: '0'
    },
    CESecondary: {
        type: String,
        lowercase: true,
        default: ''
    },
    CESecondaryYearsExp: {
        type: String,
        default: '0'
    },
    JBSecondary: {
        type: String,
        lowercase: true,
        default: ''
    },
    JBSecondaryYearsExp: {
        type: String,
        default: '0'
    },
    VBSecondary: {
        type: String,
        lowercase: true,
        default: ''
    },
    VBSecondaryYearsExp: {
        type: String,
        default: '0'
    },
    BBSecondary: {
        type: String,
        lowercase: true,
        default: ''
    },
    BBSecondaryYearsExp: {
        type: String,
        default: '0'
    },
    
    
    // marching band/pepband specific
    weight: {
        type: String,
        default: '0'
    },
    shirtSize: {
        type: String,
        default: 'large'
    }
});

mongoose.model('Bandapplication', BandapplicationSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var user = Schema.ObjectId.UserSchema;

var validatePhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

var validateRank = function(rank) {
    //if rank between [0-4], return true
    var inRange = rank[0]>0 && rank[1]>0 && rank[2]>0 && rank[3]>0 && rank[0]<=4 && rank[1]<=4 && rank[2]<=4 && rank[3]<=4;
    for (var i = rank.length - 1; i >= 0; i--) {
        var j=i;
        var unequal = true;
        while (j-- >= 0) {
            unequal = rank[i]!==rank[j];
            if (!unequal) return false;
        }
    }
    return inRange;
};

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
    band: {
        type: Schema.ObjectId,
        ref: 'Band'
    },
    // (admitted to Santa Fe, Innovation Academy, or attending another state school)
    status: {
        type: String,
        default: ''
    },
    // booleans that specify what bands this application is for
    marchingBand: {
        type: Boolean,
        default: false
    },
    concertEnsembles: {
        type: Boolean,
        default: false
    },
    jazzBand: {
        type: Boolean,
        default: false
    },
    volleyballPepBand: {
        type: Boolean,
        default: false
    },
    basketballPepBand: {
        type: Boolean,
        default: false
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
    /**
     * Drumline & Auxiliary Information
     */
    drumlineInterest: {
        type: Boolean,
        default: false
    },
    drumlineRank: {
        type: [Number],
        //[Snare, Tenors, Bass, Cymbals]
        default: [0, 0, 0, 0],
        validate: [validateRank, 'Rank must between 1-4 and you cannot reuse a ranking']
    },
    auxiliary: {
        type: [Boolean],
        //[Gatorettes, Florida Visual Ensemble]
        default: '',
    },
    // marching band/pepband specific
    weight: {
        type: String,
        default: 'No weight specified'
    },
    shirtSize: {
        type: String,
        default: 'No size specified'
    }
});

mongoose.model('Bandapplication', BandapplicationSchema);

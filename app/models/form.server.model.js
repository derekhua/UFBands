'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

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

var MarchingBandFormSchema = new Schema ({
	/**
	 * Metadata
	 */
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: 'Gator Band Application',
		required: 'Title cannot be blank'
	},
	/**
	 * Personal Information
	 */
	gatorlink: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] //TODO regex for ufl.edu
	},
	alternate: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	status: {
		type: [Boolean],
		default: [false, false, false] 
		//[Admitted for Fall, Admitted to Innovation Academy, Attending State School]
	},
	major: {
		type: String
	},
	//Primary Instrument
	primary: {
		type: String,
		lowercase: true,
		default: '',
		required: 'Must specify an instrument',
		enum: ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos']
	},
	primaryYearsExp: {
		type: Number,
		default: 0,
		min: 0,
		required: true
	},
	primaryPrivateInstruction: {
		type: Boolean,
		default: false
	},
	//Secondary Instrument
	secondary: {
		type: String,
		lowercase: true,
		default: '',
		enum: ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos']
	},
	secondaryYearsExp: {
		type: Number,
		default: 0,
		min: 0
	},
	secondaryPrivateInstruction: {
		type: Boolean,
		default: false
	},
	highSchool: [{
		name: {
			type: String,
			required: true
		},
		city: {
			type: String,
		},
		state: {
			type: String,
			match: [/^.{2}$/, 'Must enter a (2) letter state abbreviation']
		},
		gradYear: {
			type: String,
			match: [/^\d{4}$/, 'Must enter a (4) digit year']
		}
	}],
	/**
	 * Contact Information
	 */
	permanentHomeAddress: [{
		line1: {
			type: String,
			required: true
		},
		line2: {
			type: String,
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true,
			match: [/^.{2}$/, 'Must enter a (2) letter state abbreviation']
		},
		zip: {
			type: String,
			required: true,
			match: [/^\d{5}/, 'Must enter a (5) digit zip code']
		}
	}],
	secondaryHomeAddress: [{
		line1: {
			type: String,
		},
		line2: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
			match: [/^.{2}$/, 'Must enter a (2) letter state abbreviation']
		},
		zip: {
			type: String,
			match: [/^\d{5}$/, 'Must enter a (5) digit zip code']
		}
	}],
	cellPhone: {
		type: String,
		validate: [validatePhoneRegex, 'Must enter a valid US telephone #']
	},
	homePhone: {
		type: String,
		validate: [validatePhoneRegex, 'Must enter a valid US telephone #']
	},
	secondaryPhone: [{
		phone1: {
			type: String,
			validate: [validatePhoneRegex, 'Must enter a valid telephone #']
		},
		phone2: {
			type: String,
			validate: [validatePhoneRegex, 'Must enter a valid telephone #']
		}
	}],
	/**
	 * Ensemble Interest
	 */
	interest: {
		type: [Boolean],
		//[Marching Band, Wind Symphony & Symphonic Band, Jazz Band, Basketball Pep Band, Volleyball Pep Band]
		default: [false, false, false, false, false],
		required: 'Must specify at least one ensemble interest'
	},
	isFirstYear: {
		type: Boolean,
		default: false,
		required: 'Must specify if this is your first year in a UF Band'
	},
	firstYear: {
		type: String,
		match: [/^fall|spring\s*\d{4}$/i, 'Must enter a semester (Fall or Spring) and a (4) digit year']
	},
	/**
	 * Drumline & Auxiliary Information
	 */
	drumlineRank: {
		type: [Number],
		//[Snare, Tenors, Bass, Cymbals]
		default: [1, 2, 3, 4],
		validate: [validateRank, 'Rank must between 1-4 and you cannot reuse a ranking']
	},
	auxiliary: {
		type: [Boolean],
		//[Gatorettes, Florida Visual Ensemble]
		default: [false, false]
	}
});
/**
 * Form Schema
 */
var FormSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	deadline: {
		type: Date
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Form', FormSchema);
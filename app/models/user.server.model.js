'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};


var validatePhoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your phone number']
    },
    gatorlink: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid UF gatorlink email address'] //TODO regex for ufl.edu
	},
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    //Primary Instrument
    primary: {
	type: String,
	default: '',
	required: 'Must specify an instrument',
//	enum: ['Piccolo', 'Flute', 'Clarinet', 'Oboe', 'English Horn', 'Basson', 'Contrabass',
//		'Contrabass Bassoon', 'Alto Saxophone', 'Tenor Saxophone','Baritone Saxophone', 
//		'French Horn', 'Horn', 'Mellophone','Trumpet', 'Cornet', 'Baritone', 'Euphonium', 'Trombone',
//		'Bass Trombone', 'Tuba', 'Sousaphone', 'String Bass', 'Bass', 'Bass Guitar', 'Guitar',
//		'Percussion', 'Bass Drum', 'Quads', 'Tenors', 'Snare', 'Cymbals', 'Triangle', 'Timpani', 
//		'Marimba', 'Vibraphone', 'Xylophone', 'Glockenspiel', 'Drumset', 
//		'Celeste', 'Celesta', 'Piano', 'Harp', 'Bongos']
    },
    primaryYears: {
            type: String,
            default: '0'
        },
    nickName: {
        type: String,
        trim: true,
        default: ''
    },
    ufid: {
        type: String,
        unique: true,
        default: '',
        match: [/^\d{8}$/, 'Please enter a valid UF ID'] //8 digit input
    },
    permanentAddress: {
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
	},
    localAddress: {
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
	},
    //highschool and grad year
    highSchool: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your high school and grad year']
    },
    graduationDate: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your graduation date']
    },
    // class 1EG,..
    class: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your class']
    },
    major: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your major']
    },
    // e.g. freshman
    year: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your year (e.g. freshman)']
    },
    userType: {
        type: String,
        trim: true,
        default: 'Prospective',
        validate: [validateLocalStrategyProperty, 'Please choose a user type']
    },    
    displayName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: 'testing error message',
        required: 'Please fill in a username',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    weight: {
        type: Number
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin', 'moderator']
        }],
        default: ['user']
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
    bandMember: {
        type: String,
        enum: ['','march','jazz','wind','symph','bball_pep','volley_pep']
        default: ''
    }
    MemberOf: {
        march: {
            type: String,
            default: 'false'
        }
        jazz: {
             type: String,
            default: 'false'   
        }
        wind: {
             type: String,
            default: 'false'
        }
        symph: {
             type: String,
            default: 'false'
        }
        bball_pep: {
             type: String,
            default: 'false'
        }
        volley_pep: {
             type: String,
            default: 'false'
        }
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('User', UserSchema);

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
        
//        firstName: {
//        type: String,
//        trim: true,
//        default: user.firstName,
//        },
//        lastName: {
//            type: String,
//            trim: true,
//            default: user.lastName,
//        },
//        phoneNumber: {
//            type: String,
//            trim: true,
//            default: user.phoneNumber,
//        },
//        gatorlink: {
//            type: String,
//            trim: true,
//            default: user.gatorlink,
//            },
//        email: {
//            type: String,
//            trim: true,
//            default: user.email,
//        },
//        //Primary Instrument
//        primary: {
//            type: String,
//            lowercase: true,
//            default: user.primary,
//        },
//        nickName: {
//            type: String,
//            trim: true,
//            default: user.nickName
//        },
//        ufid: {
//            type: String,
//            unique: true,
//            default: user.ufid,
//        },
//        permanentAddress: {
//                    line1: {
//                            type: String,
//                            required: true,
//                            default: user.permanentAddress.line1
//                    },
//                    line2: {
//                            type: String,
//                            default: user.permanentAddress.line2
//                    },
//                    city: {
//                            type: String,
//                            required: true,
//                            default: user.permanentAddress.city
//                    },
//                    state: {
//                            type: String,
//                            required: true,
//                            default: user.permanentAddress.state
//                    },
//                    zip: {
//                            type: String,
//                            required: true,
//                            default: user.permanentAddress.zip
//                    }
//        },
//        localAddress: {
//                    line1: {
//                            type: String,
//                            default: user.localAddress.line1
//                    },
//                    line2: {
//                            type: String,
//                            default: user.localAddress.line2
//                    },
//                    city: {
//                            type: String,
//                            default: user.localAddress.city
//                    },
//                    state: {
//                            type: String,
//                            default: user.localAddress.state
//                    },
//                    zip: {
//                            type: String,                            
//                            default: user.localAddress.zip
//                    }
//        },
//        //highschool and grad year
//        highSchool: {
//            type: String,
//            trim: true,
//            default: user.highSchool,            
//        },
//        graduationDate: {
//            type: String,
//            trim: true,
//            default: user.graduationDate,            
//        },
//        // class 1EG,..
//        class: {
//            type: String,
//            trim: true,
//            default: user.class
//        },
//        major: {
//            type: String,
//            trim: true,
//            default: user.major,
//        },
//        // e.g. freshman
//        year: {
//            type: String,
//            trim: true,
//            default: user.year,
//        },
//        userType: {
//            type: String,
//            trim: true,
//            default: user.userType,
//        },
        
        
        // booleans that specify what bands this application is for
        marchingBand: {
            type: String,
            default: 'false'
        },
        windSymphony: {
            type: String,
            default: 'false'
        },
        symphonicBand: {
            type: String,
            default: 'false'
        },
        jazzBand: {
            type: String,
            default: 'false'
        },
        pepBand: {
            type: String,
            default: 'false'
        },
        
        // 2015-2016 Generic App
        primaryYears: {
            type: String,
            default: '0'
        },
        secondaryYears: {
            type: String,
            default: '0'
        },
        // (admitted to Santa Fe, Innovation Academy, or attending another state school)
        status: {
            type: String,
            defualt: ''
        },
        // instrument if different than primary
        secondary: {
            type: String,
            lowercase: true,
            default: ''
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
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Band Schema
 */
var BandSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        enum: ['marching band', 'gator band', 'gator marching band', 'wind symphony', 'symphonic band', 
        'concert band', 'tuesday/thursday concert band', 'tuesday-thursday concert band', 'monday concert band',
        'monday night concert band', 'jazz band', 'basketball pep band', 'volleyball pep band', 'alumni pep band', 
        'alumni band', 'alumni marching pep band'],
        required: 'Must specify a band.'
    },
    startDate:{
        type: Date,
        required: 'Must specify a start date.'
    },
    endDate:{
        type: Date,
        required: 'Must specify an end date.'
    }
});

mongoose.model('Bands', BandSchema);

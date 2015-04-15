'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateDate = function (date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return (0<day && day<=31) && (0<=month && month<=11) && (2015<=year);
};

var validateStartDate = function(startDate) {
    return startDate <= this.endDate;
};
var validateEndDate = function(endDate) {
    return this.startDate <= endDate;
};
var validateOpenDate = function(openDate) {
    return openDate <= this.closeDate;
};
var validateCloseDate = function(closeDate) {
    return this.openDate <= closeDate;
};

/**
 * Band Schema
 */
var BandSchema = new Schema({
    // general info
	created: {
		type: Date,
		default: Date.now
	},
    name: {
        type: String,
        required: 'Must specify the band name',
        enum: ['Marching Band', 'Gator Band', 'Symphonic Band', 'Wind Symphony', 'Concert Ensembles', 
        'Jazz Band', 'Volleyball Pep Band', 'Basketball Pep Band', 'Alumni Band']
    },
    startDate: {
        type: Date,
        default: Date.now,
        validate: [
            {validator: validateDate, msg: 'Must enter a valid date'},
            {validator: validateStartDate, msg: 'Must specify a start date that is before the end date'}
        ]
    },
    endDate: {
        type: Date,
        default: Date.now,
        validate: [
            {validator: validateDate, msg: 'Must enter a valid date'},
            {validator: validateEndDate, msg: 'Must specify an end date that is after the start date'}
        ]
    },
    openDate: {
        type: Date,
        default: Date.now,
        validate: [
            {validator: validateDate, msg: 'Must enter a valid date'},
            {validator: validateOpenDate, msg: 'Must specify an open date that is before the close date'}
        ]
    },
    closeDate: {
        type: Date,
        default: Date.now,
        validate: [
            {validator: validateDate, msg: 'Must enter a valid date'},
            {validator: validateCloseDate, msg: 'Must specify a close date that is after the open date'}
        ]
    }
});
//db.bands.insert({name: "Gator Band"}, {startDate: Date()}, {endDate: Date()}, {openDate: Date()}, {closeDate: Date()})
mongoose.model('Band', BandSchema);

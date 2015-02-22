'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Bands Schema
 */
var bandsSchema = new Schema({
    name:{
        type:String,
        default: 'Marching'
    },
    link:{
        type:String,
        default: 'https://facebook.com'
    }
    //endDate:{
    //    type:Date,
    //    default: Date.nov
    //}
});

mongoose.model('Bands', bandsSchema);

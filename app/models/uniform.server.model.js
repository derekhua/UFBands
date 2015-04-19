'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NumberSchema = new Schema({
    type: Number,
    min: 0
});

var SizeSchema = new Schema({
    size: {
        type: String,
        lowercase: true,
        enum: ['xs', 's', 'm', 'r', 'l', 'xl', '2xl', '3xl', '4xl']
    }
});

var MarchingBandArticleSchema = new Schema({
    num: Number,
    size: [SizeSchema],
    barcode: String
});

var MarchingBandUniformSchema = new Schema({
    //Marching Band Uniform
    marchingUniformId: Number,
    marchingUniformBarcode: String,
    brandName: String,
    sex: {
        type: String,
        enum: ['m', 'f']
    },
    height: [{
        feet: { 
            type: Number, 
            min: 0
        },
        inches: {
            type: Number, 
            min: 0}
    }],
    weight: [NumberSchema],
    chest: [NumberSchema],
    waist: [NumberSchema],
    coat: [MarchingBandArticleSchema],
    jumpsuit: [MarchingBandArticleSchema]
});

var MarchingBandGearSchema = new Schema({
    //Other Gear
    shortsSize: [{
        num: [NumberSchema],
        sex: {
            type: String,
            lowercase: true,
            enum: ['m', 'f']
        }
    }],
    //Marching Band Travel Gear
    jacket: [{
        article: [MarchingBandArticleSchema],
        sex: {
            type: String,
            lowercase: true,
            enum: ['m', 'f']
        }
    }],
    pants: [{
        article: [MarchingBandArticleSchema],
        sex: {
            type: String,
            lowercase: true,
            enum: ['m', 'f']
        }
    }]
});

/**
 * Uniform Schema
 */
var UniformSchema = new Schema({
    /**
     * Generic Band
     */
    bandName: {
        type: String,
        lowercase: true,
        trim: true,
        default:'',
        enum: ['marching band', 'gator band', 'gator marching band', 'basketball pep band', 'volleyball pep band', 
        'alumni pep band', 'alumni band', 'alumni marching pep band'],
        required: 'Must specify a band.'
    },
    shirtSize: [SizeSchema], //Gator Band Shirts, Gator Band Polo, Pep Band Polo, or Pep Band Jersey Size
    marchingBand: [{
        uniform: [MarchingBandUniformSchema],
        gear: [MarchingBandGearSchema]
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
    description: {
        type: String,
        trim: true,
        default:''
    }
});

mongoose.model('Uniform', UniformSchema);

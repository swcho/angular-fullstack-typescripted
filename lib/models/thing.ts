/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');

export interface TThing extends mongoose.Document {
    name: string;
    info: string;
    awesomeness: number;
}

var Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ThingSchema = new Schema({
    name: String,
    info: String,
    awesomeness: Number
});

/**
 * Validations
 */
ThingSchema.path('awesomeness').validate(function (num) {
    return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');

mongoose.model<TThing>('Thing', ThingSchema);

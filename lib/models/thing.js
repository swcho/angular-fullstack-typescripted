var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ThingSchema = new Schema({
    name: String,
    info: String,
    awesomeness: Number
});

ThingSchema.path('awesomeness').validate(function (num) {
    return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');

mongoose.model('Thing', ThingSchema);

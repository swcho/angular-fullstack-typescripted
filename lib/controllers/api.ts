/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import thing = require('../models/thing');

var Thing = mongoose.model<thing.TThing>('Thing');

/**
 * Get awesome things
 */
export function awesomeThings(req, res) {
    return Thing.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose');

var Thing = mongoose.model('Thing');

/**
* Get awesome things
*/
function awesomeThings(req, res) {
    return Thing.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
}
exports.awesomeThings = awesomeThings;
;
//# sourceMappingURL=api.js.map

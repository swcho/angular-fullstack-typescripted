var mongoose = require('mongoose');

var Thing = mongoose.model('Thing');

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

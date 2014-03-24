/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />
var express = require('express');
var path = require('path');

/**
* Send partial, or 404 if it doesn't exist
*/
function partials(req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function (err, html) {
        if (err) {
            console.log("Error rendering partial '" + requestedView + "'\n", err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
}
exports.partials = partials;
;

/**
* Send our single page app
*/
function index(req, res) {
    res.render('index');
}
exports.index = index;
;
//# sourceMappingURL=index.js.map

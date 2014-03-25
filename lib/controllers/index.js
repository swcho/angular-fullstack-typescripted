var express = require('express');
var path = require('path');

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

function index(req, res) {
    res.render('index');
}
exports.index = index;
;

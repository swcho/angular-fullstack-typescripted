/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />

import express = require('express');
import path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
export function partials(req: express.Request, res: express.Response) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function(err, html) {
        if(err) {
            console.log("Error rendering partial '" + requestedView + "'\n", err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};

/**
 * Send our single page app
 */
export function index(req: express.Request, res: express.Response) {
    res.render('index');
};

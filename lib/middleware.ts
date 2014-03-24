/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/passportjs/express-passport.d.ts" />

import express = require('express');
import passport = require('passport');

/**
 * Custom middleware used by the application
 */

/**
 *  Protect routes on your api from unauthenticated access
 */
export function auth(req: passport.Request, res: express.Response, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
}

/**
 * Set a cookie for angular so it knows we have an http session
 */
export function setUserCookie(req: express.Request, res: express.Response, next) {
    if(req.user) {
        res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
}

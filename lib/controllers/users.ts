/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../models/user" />

import mongoose = require('mongoose');
import user = require('../models/user');
var passport = require('passport');

var User = mongoose.model<user.TUser>('User');

/**
 * Create user
 */
export function create(req, res, next) {
    var newUser: user.TUser = <user.TUser>(new User(req.body));
    newUser.provider = 'local';
    newUser.save<user.TUser>(function(err) {
        if (err) return res.json(400, err);

        req.logIn(newUser, function(err) {
            if (err) return next(err);

            return res.json(req.user.userInfo);
        });
    });
};

/**
 *  Get profile of specified user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(404);

        res.send({ profile: user.profile });
    });
};

/**
 * Change password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if(user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return res.send(400);

                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get current user
 */
export function me(req, res) {
    res.json(req.user || null);
};
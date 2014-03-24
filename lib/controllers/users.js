/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../models/user" />
var mongoose = require('mongoose');

var passport = require('passport');

var User = mongoose.model('User');

/**
* Create user
*/
function create(req, res, next) {
    var newUser = (new User(req.body));
    newUser.provider = 'local';
    newUser.save(function (err) {
        if (err)
            return res.json(400, err);

        req.logIn(newUser, function (err) {
            if (err)
                return next(err);

            return res.json(req.user.userInfo);
        });
    });
}
exports.create = create;
;

/**
*  Get profile of specified user
*/
function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return res.send(404);

        res.send({ profile: user.profile });
    });
}
exports.show = show;
;

/**
* Change password
*/
function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err)
                    return res.send(400);

                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
}
exports.changePassword = changePassword;
;

/**
* Get current user
*/
function me(req, res) {
    res.json(req.user || null);
}
exports.me = me;
;
//# sourceMappingURL=users.js.map

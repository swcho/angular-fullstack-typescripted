/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose');
var passport = require('passport');

/**
* Logout
*/
function logout(req, res) {
    req.logout();
    res.send(200);
}
exports.logout = logout;
;

/**
* Login
*/
function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error)
            return res.json(401, error);

        req.logIn(user, function (err) {
            if (err)
                return res.send(err);
            res.json(req.user.userInfo);
        });
    })(req, res, next);
}
exports.login = login;
;
//# sourceMappingURL=session.js.map

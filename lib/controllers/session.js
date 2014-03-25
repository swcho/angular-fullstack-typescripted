var mongoose = require('mongoose');
var passport = require('passport');

function logout(req, res) {
    req.logout();
    res.send(200);
}
exports.logout = logout;
;

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

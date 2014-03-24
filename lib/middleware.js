/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/passportjs/passport.d.ts" />
/**
* Custom middleware used by the application
*/
/**
*  Protect routes on your api from unauthenticated access
*/
function auth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(401);
}
exports.auth = auth;

/**
* Set a cookie for angular so it knows we have an http session
*/
function setUserCookie(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
}
exports.setUserCookie = setUserCookie;
//# sourceMappingURL=middleware.js.map

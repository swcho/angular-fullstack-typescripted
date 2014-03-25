var express = require('express');
var passport = require('passport');

function auth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(401);
}
exports.auth = auth;

function setUserCookie(req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
}
exports.setUserCookie = setUserCookie;

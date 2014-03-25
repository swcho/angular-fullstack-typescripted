var mongoose = require('mongoose');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }, '-salt -hashedPassword', function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.findOne({
        email: email
    }, function (err, user) {
        if (err)
            return done(err);

        if (!user) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        if (!user.authenticate(password)) {
            return done(null, false, {
                message: 'This password is not correct.'
            });
        }
        return done(null, user);
    });
}));

module.exports = passport;

var express = require('express');
var path = require('path');
var config = require('./config');
var passport = require('passport');
var mongoStore = require('connect-mongo')(express);

module.exports = function (app) {
    app.configure('development', function () {
        app.use(require('connect-livereload')());

        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.set('views', config.root + '/app/views');
    });

    app.configure('production', function () {
        app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('views', config.root + '/views');
    });

    app.configure(function () {
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(express.logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser());

        app.use(express.session({
            secret: 'angular-fullstack secret',
            store: new mongoStore({
                url: config.mongo.uri,
                collection: 'sessions'
            }, function () {
                console.log("db connection open");
            })
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(app.router);
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });
};

var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

var db = mongoose.connect(config.mongo.uri, config.mongo.options);

var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

require('./lib/config/dummydata');

var passport = require('./lib/config/passport');

var app = express();

require('./lib/config/express')(app);

require('./lib/routes')(app);

app.listen(config.port, function () {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;

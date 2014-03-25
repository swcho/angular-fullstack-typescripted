/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/should/should.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var should = require('should');
var mongoose = require('mongoose');
var user = require('../../../lib/models/user');

var User = mongoose.model('User');
var sUser;

describe('User Model', function () {
    before(function (done) {
        sUser = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@test.com',
            password: 'password'
        });

        // Clear users before testing
        User.remove({}).exec();
        done();
    });

    afterEach(function (done) {
        User.remove({}).exec();
        done();
    });

    it('should begin with no users', function (done) {
        User.find({}, function (err, users) {
            users.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate user', function (done) {
        sUser.save();
        var userDup = new User(user);
        userDup.save(function (err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving without an email', function (done) {
        sUser.email = '';
        sUser.save(function (err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate user if password is valid", function () {
        sUser.authenticate('password').should.be.true;
    });

    it("should not authenticate user if password is invalid", function () {
        sUser.authenticate('blah').should.not.be.true;
    });
});
//# sourceMappingURL=model.js.map

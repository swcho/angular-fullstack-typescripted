/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/should/should.d.ts" />
/// <reference path="../../../typings/supertest/supertest.d.ts" />
var app = require('../../../server');
var request = require('supertest');

describe('GET /api/awesomeThings', function () {
    it('should respond with JSON array', function (done) {
        request(app).get('/api/awesomeThings').expect(200).expect('Content-Type', /json/).end(function (err, res) {
            if (err)
                return done(err);
            res.body.should.be.instanceof(Array);
            done();
        });
    });
});
//# sourceMappingURL=api.js.map

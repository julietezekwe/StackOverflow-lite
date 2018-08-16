const request = require('supertest');
const chai = require('chai');
const app = require('../dist/app').default;
const should = chai.should();

describe('Fetch all questions', function() {
    it('respond with json containing list of all questions', function() {
        request(app).get('/api/v1/questions')
        .end(function(err, res) {
            res.should.have.property('status', 200);
            res.body.should.be.a('array');
            res.body[0].should.have.all.keys('id', 'title', 'context', 'answers');
        });
    });
    it('respond with selected question', function() {
        request(app).get('/api/v1/questions/1')
        .end(function(err, res) {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('id', 'title', 'context', 'answers');
        });
    });
    it('respond with 404 error', function() {
        request(app).get('/api/v1/questions/54')
        .end(function(err, res) {
            res.should.have.property('status', 404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
        });
    });
});
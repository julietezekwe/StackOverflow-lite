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
    it('respond with 400 error', function() {
        request(app).get('/api/v1/questions/1f')
        .end(function(err, res) {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
        });
    });
});

describe('Add a questions', function() {
    it('respond with json containing question added', function() {
        request(app).post('/api/v1/questions')
        .send({
            title: "Mocha Test Question",
            context: "Mocha Test Body of Question Ok!"
        })
        .end(function(err, res) {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('id', 'title', 'context', 'answers');
        });
    });
    it('respond with 400 error', function() {
        request(app).post('/api/v1/questions')
        .send({
            title: "",
            context: ""
        })
        .end(function(err, res) {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
        });
    });
    it('respond with 400 error', function() {
        request(app).post('/api/v1/questions')
        .send({
            foo: "Lorem Ipsum",
            bar: "Grace ipsum"
        })
        .end(function(err, res) {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
        });
    });
    after(function() {
        process.exit();
    })
});
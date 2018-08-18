const request = require('supertest');
const chai = require('chai');
const app = require('../dist/app').default;
const should = chai.should();

describe('Test api requests', function() {
    describe('Test question routes', function() {
        describe('Fetch question', function() {
            before(function(done) {
                request(app).post('/api/v1/questions')
                .send({
                    title: "Lorem Ipsum Title Gracias",
                    context: "Lorem ipsum generato cos i'll rise up and do it a thousand times again"
                })
                .end(done);
            })
            it('respond with json containing list of all questions', function() {
                request(app).get('/api/v1/questions')
                .end(function(err, res) {
                    res.should.have.property('status', 200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
                });
            });
            it('respond with selected question', function() {
                request(app).get('/api/v1/questions/1')
                .end(function(err, res) {
                    res.should.have.property('status', 200);
                    res.body.should.be.a('object');
                    res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
                });
            });
            it('respond with question not found', function() {
                request(app).get('/api/v1/questions/50094')
                .end(function(err, res) {
                    res.should.have.property('status', 404);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with invalid request', function() {
                request(app).get('/api/v1/questions/1f')
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            after(function(done) {
                request(app).delete('/api/v1/questions/1')
                .end(done);
            });
        });
        describe('Add a question', function() {
            it('respond with json containing question added', function() {
                request(app).post('/api/v1/questions')
                .send({
                    title: "Mocha Test Question",
                    context: "Mocha Test Body of Question Ok!"
                })
                .end(function(err, res) {
                    res.should.have.property('status', 201);
                    res.body.should.be.a('object');
                    res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
                });
            });
            it('respond with invalid request for empty body data', function() {
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
            it('respond with invalid request for bad body data', function() {
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
            after(function(done) {
                request(app).delete('/api/v1/questions/1')
                .end(done);
            });
        });
        describe('Update a question', function() {
            before(function(done) {
                request(app).post('/api/v1/questions')
                .send({
                    title: "Lorem Ipsum Title Gracias",
                    context: "Lorem ipsum generato cos i'll rise up and do it a thousand times again"
                })
                .end(done);
            })
            it('respond with updated question', function() {
                request(app).put('/api/v1/questions/1')
                .send({
                    title: "Mocha Test Question Updated",
                    context: "Mocha Test Body of Question Updated Ok!"
                })
                .end(function(err, res) {
                    res.should.have.property('status', 200);
                    res.body.should.be.a('object');
                    res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
                });
            });
            it('respond with invalid request for empty body data', function() {
                request(app).put('/api/v1/questions/1')
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
            it('respond with invalid request for bad body data', function() {
                request(app).put('/api/v1/questions/1')
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
            it('respond with question not found', function() {
                request(app).put('/api/v1/questions/50094')
                .send({
                    title: "Mocha Test Question Updated",
                    context: "Mocha Test Body of Question Updated Ok!"
                })
                .end(function(err, res) {
                    res.should.have.property('status', 404);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            after(function(done) {
                request(app).delete('/api/v1/questions/1')
                .end(done);
            });
        });
        describe('Delete a question', function() {
            before(function(done) {
                request(app).post('/api/v1/questions')
                .send({
                    title: "Lorem Ipsum Title Gracias",
                    context: "Lorem ipsum generato cos i'll rise up and do it a thousand times again"
                })
                .end(done);
            })
            it('respond with invalid request', function() {
                request(app).get('/api/v1/questions/1f')
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with delete succesfull status', function() {
                request(app).delete('/api/v1/questions/1')
                .end(function(err, res) {
                    res.should.have.property('status', 204);
                });
            });
            it('respond with question not found', function() {
                request(app).delete('/api/v1/questions/50094')
                .end(function(err, res) {
                    res.should.have.property('status', 404);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
        });
    })
    describe('Test answer routes', function() {
        before(function(done) {
            request(app).post('/api/v1/questions')
            .send({
                title: "Lorem Ipsum Title Gracias",
                context: "Lorem ipsum generato cos i'll rise up and do it a thousand times again"
            })
            .end(done);
        })
        describe('Add an answer', function() {
            it('respond with added answer object', function() {
                request(app).post('/api/v1/questions/1/answers')
                .send({
                    answer: "Mocha Test Answer",
                })
                .end(function(err, res) {
                    res.should.have.property('status', 201);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('id','answer','createdAt');
                });
            });
            it('respond with invalid request for empty body data', function() {
                request(app).post('/api/v1/questions/1/answers')
                .send({
                    answer: ""
                })
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with invalid request for bad body data', function() {
                request(app).post('/api/v1/questions/1/answers')
                .send({
                    foo: "",
                })
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with question not found', function() {
                request(app).post('/api/v1/questions/50094/answers')
                .send({
                    answer: "Hi!",
                })
                .end(function(err, res) {
                    res.should.have.property('status', 404);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
        });
        describe('Accept an answer', function() {
            it('respond with data object', function() {
                request(app).post('/api/v1/questions/1/answers/accept')
                .send({
                    answer_id: 1,
                })
                .end(function(err, res) {
                    res.should.have.property('status', 200);
                    res.body.should.be.a('object');
                });
            });
            it('respond with invalid request for empty body data', function() {
                request(app).post('/api/v1/questions/1/answers/accept')
                .send({
                    answer_id: ""
                })
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with invalid request for bad body data', function() {
                request(app).post('/api/v1/questions/1/answers/accept')
                .send({
                    foo: "",
                })
                .end(function(err, res) {
                    res.should.have.property('status', 400);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
            it('respond with answer not found', function() {
                request(app).post('/api/v1/questions/50094/answers')
                .send({
                    answer: 11435543,
                })
                .end(function(err, res) {
                    res.should.have.property('status', 404);
                    res.body.should.be.a('object');
                    res.body.should.have.all.keys('error');
                });
            });
        });
        after(function(done) {
            request(app).delete('/api/v1/questions/1')
            .end(done);
        });
    })
    describe('Test invalid route', function() {
        it('respond with route not found', function() {
            request(app).get('/api/v987/facebook')
            .end(function(err, res) {
                res.should.have.property('status', 404);
                res.body.should.be.a('object');
                res.body.should.have.all.keys('error');
            });
        });
    });
    after(function (done) {
        app.close();
        done();
    });
});
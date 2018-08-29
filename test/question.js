import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';
import pool from '../dist/db/dbconnect';

const should = chai.should();
const validUser = {
  name: 'Jeffery Way',
  email: 'admin@blog.com',
  password: 'secret',
};
const anotherValidUser = {
  name: 'Grace Adefuwa',
  email: 'grace_ade@blog.com',
  password: 'secret',
};
const question = {
  title: 'Mocha Test Question',
  context: 'Mocha Test Body of Question Ok!',
};
let token = null;
let anotherToken = null;
let quesId = null;

describe('Test api requests', () => {
  before((done) => {
    pool.query('DELETE FROM Users').then(() => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((_error, response) => {
          token = response.body.token;
          response.should.have.property('status', 201);
        });
      request(app).post('/api/v1/auth/signup')
        .send(anotherValidUser)
        .end((_error, response) => {
          done();
          anotherToken = response.body.token;
          response.should.have.property('status', 201);
        });
    });
  });
  describe('Test question request route', () => {
    describe('post a question', () => {
      it('return 403 error, cannot post a question without token header', (done) => {
        request(app).post('/api/v1/questions')
          .send(question)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 403);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 400 error, cannot post question with empty data', (done) => {
        request(app).post('/api/v1/questions')
          .send({
            title: '',
            context: '',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 400);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 400 error, cannot post question with invalid data keys', (done) => {
        request(app).post('/api/v1/questions')
          .send({
            foo: 'Lorem Ipsum',
            bar: 'Grace ipsum',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 400);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 400 error, cannot post question with invalid token', (done) => {
        request(app).post('/api/v1/questions')
          .send(question)
          .set('Authorization', `Bearer ${token}e`)
          .end((_error, response) => {
            quesId = response.body.id;
            done();
            response.should.have.property('status', 400);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 201 response code and object containing question data', (done) => {
        request(app).post('/api/v1/questions')
          .send(question)
          .set('Authorization', `Bearer ${token}`)
          .end((_error, response) => {
            quesId = response.body.id;
            done();
            response.should.have.property('status', 201);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('id', 'title', 'context', 'user_id');
            response.body.title.should.equal(question.title);
            response.body.context.should.equal(question.context);
          });
      });
    });
    describe('fetch all questions', () => {
      it('return 200 response code and all questions', (done) => {
        request(app).get('/api/v1/questions')
          .end((_error, response) => {
            done();
            response.should.have.property('status', 200);
            response.body.should.be.a('array');
          });
      });
    });
    describe('fetch a question', () => {
      it('return 200 response code and selected question', (done) => {
        request(app).get(`/api/v1/questions/${quesId}`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 200);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('id', 'title', 'context', 'user_id', 'answers');
            response.body.title.should.equal(question.title);
            response.body.context.should.equal(question.context);
          });
      });
      it('return 404 response code for question not found', (done) => {
        request(app).get('/api/v1/questions/100000')
          .end((_error, response) => {
            done();
            response.should.have.property('status', 404);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 400 response code for invalid id parameter', (done) => {
        request(app).get('/api/v1/questions/1fe')
          .end((_error, response) => {
            done();
            response.should.have.property('status', 400);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
    });
    describe('delete a question', () => {
      it('return 403 error, cannot delete another user question', (done) => {
        request(app).delete(`/api/v1/questions/${quesId}`)
          .set('Authorization', `Bearer ${anotherToken}`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 403);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('status', 'error');
            response.body.status.should.equal(false);
          });
      });
      it('return 400 error, cannot post question with invalid token', (done) => {
        request(app).delete(`/api/v1/questions/${quesId}`)
          .set('Authorization', `Bearer ${token}e`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 400);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('error', 'status');
            response.body.status.should.equal(false);
          });
      });
      it('return 200 response code and successfully deleted', (done) => {
        request(app).delete(`/api/v1/questions/${quesId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((_error, response) => {
            done();
            response.should.have.property('status', 200);
            response.body.should.be.a('object');
            response.body.should.have.all.keys('status', 'message');
          });
      });
    });
  });
  after((done) => {
    app.close();
    done();
  });
});

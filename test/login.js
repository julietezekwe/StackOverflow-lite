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
const invalidUser = {
  email: 'jeff_amazon@blog.com',
  password: 'secret',
};
describe('Test api requests', () => {
  before((done) => {
    pool.query('DELETE FROM Users').then(() => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((_error, response) => {
          done();
          response.should.have.property('status', 201);
        });
    });
  });
  describe('Test login request route', () => {
    it('return 200 response code and user successfully logged in', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          email: validUser.email,
          password: validUser.password,
        })
        .end((_error, response) => {
          done();
          response.should.have.property('status', 200);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('data', 'token');
          response.body.data.email.should.equal(validUser.email);
        });
    });
    it('return 404 error, cannot log in user who is not registered', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          email: invalidUser.email,
          password: invalidUser.password,
        })
        .end((_error, response) => {
          done();
          response.should.have.property('status', 404);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error', 'status');
          response.body.status.should.equal(false);
        });
    });
    it('return 400 error, cannot login user with empty data', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          email: '     ',
          password: '',
        })
        .end((_error, response) => {
          done();
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error', 'status');
          response.body.status.should.equal(false);
        });
    });
    it('return 400 error, cannot log in user with invalid data keys', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          foo: '',
          bar: '',
        })
        .end((_error, response) => {
          done();
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error', 'status');
          response.body.status.should.equal(false);
        });
    });
  });
  after((done) => {
    app.close();
    done();
  });
});

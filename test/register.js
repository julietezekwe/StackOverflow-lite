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
describe('Test api requests', () => {
  before((done) => {
    pool.query('DELETE FROM Users').then(() => done());
  });
  describe('Test signup request route', () => {
    it('return 201 response code and user detail successfully created', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((error, response) => {
          done();
          response.should.have.property('status', 201);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('data', 'status', 'token');
          response.body.data.name.should.equal(validUser.name);
          response.body.data.email.should.equal(validUser.email);
        });
    });
    it('return 400 error, cannot create new user with existing email', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((error, response) => {
          done();
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error', 'status');
          response.body.status.should.equal(false);
        });
    });
    it('return 400 error, cannot create user with empty data', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send({
          name: '   ',
          email: '     ',
          password: '',
        })
        .end((error, response) => {
          done();
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error', 'status');
          response.body.status.should.equal(false);
        });
    });
    it('return 400 error, cannot create user with invalid data keys', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send({
          foo: '',
          bar: '',
          too: '',
        })
        .end((error, response) => {
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

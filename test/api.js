import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';

const should = chai.should();
const validUser = {
  name: 'Jeffery Way',
  email: 'admin@blog.com',
  password: 'secret',
};

describe('Test api requests', () => {
  describe('Test signup route', () => {
    it('respond with successfully created', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((error, response) => {
          response.should.have.property('status', 201);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('data', 'status');
          response.body.data.name.should.equal('Jeffery Way');
          response.body.data.email.should.equal('admin@blog.com');
          done();
        });
    });
    it('respond with cannot duplicate data', (done) => {
      request(app).post('/api/v1/auth/signup')
        .send(validUser)
        .end((error, response) => {
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error');
          done();
        });
    });
    it('respond with cannot create account with no details', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          name: '',
          email: '',
          password: '',
        })
        .end((error, response) => {
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error');
          done();
        });
    });
  });
  describe('Test login route', () => {
    it('respond with successfully logged in', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          email: validUser.email,
          password: validUser.password,
        })
        .end((error, response) => {
          response.should.have.property('status', 200);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('data', 'token');
          response.body.data.email.should.equal('admin@blog.com');
          const token = response.body.token;
          done();
        });
    });
    it('respond with user not found', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          email: 'jeffery@way.com',
          password: 'secret',
        })
        .end((error, response) => {
          response.should.have.property('status', 404);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error');
          done();
        });
    });
    it('respond with cannot login with no user details', (done) => {
      request(app).post('/api/v1/auth/login')
        .send({
          name: '',
          email: '',
          password: '',
        })
        .end((error, response) => {
          response.should.have.property('status', 400);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error');
          done();
        });
    });
  });
  describe('Test invalid route', () => {
    it('respond with route not found', () => {
      request(app).get('/api/v9878/facebook')
        .end((error, response) => {
          response.should.have.property('status', 404);
          response.body.should.be.a('object');
          response.body.should.have.all.keys('error');
        });
    });
  });
  after((done) => {
    app.close();
    done();
  });
});

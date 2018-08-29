import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';

const should = chai.should();

describe('Test api requests', () => {
  describe('Test invalid route', () => {
    it('respond with route not found', () => {
      request(app).get('/api/v9878/facebook')
        .end((error, response) => {
          response.should.have.property('status', 404);
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

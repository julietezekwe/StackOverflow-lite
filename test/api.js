import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';

const should = chai.should();

describe('Test api requests', () => {
  describe('Test invalid route', () => {
    it('respond with route not found', () => {
      request(app).get('/api/v9878/facebook')
        .end((err, res) => {
          res.should.have.property('status', 404);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('error');
        });
    });
  });
  after((done) => {
    app.close();
    done();
  });
});

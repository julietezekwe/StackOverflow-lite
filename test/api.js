import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';

const should = chai.should();

describe('Test api requests', () => {
  describe('Test question routes', () => {
    describe('Add a question', () => {
      it('respond with json containing question added', () => {
        request(app).post('/api/v1/questions')
          .send({
            title: 'Mocha Test Question',
            context: 'Mocha Test Body of Question Ok!',
          })
          .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('id', 'title', 'context', 'user_id');
            res.body.title.should.equal('Mocha Test Question');
            res.body.context.should.equal('Mocha Test Body of Question Ok!');
          });
      });
      it('respond with invalid request for empty body data', () => {
        request(app).post('/api/v1/questions')
          .send({
            title: '',
            context: '',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with invalid request for bad body data', () => {
        request(app).post('/api/v1/questions')
          .send({
            foo: 'Lorem Ipsum',
            bar: 'Grace ipsum',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
    });
  });
  describe('Test invalid route', () => {
    it('respond with route not found', () => {
      request(app).get('/api/v987/facebook')
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

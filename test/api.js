import request from 'supertest';
import chai from 'chai';
import app from '../dist/app';

const should = chai.should();

describe('Test api requests', () => {
  describe('Test answer routes', () => {
    describe('Add an answer', () => {
      it('respond with added answer object', () => {
        request(app).post('/api/v1/questions/1/answers')
          .send({
            answer: 'Mocha Test Answer',
          })
          .end((err, res) => {
            res.should.have.property('status', 201);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('id', 'answer', 'createdAt');
            res.body.answer.should.equal('Mocha Test Answer');
          });
      });
      it('respond with invalid request for empty body data', () => {
        request(app).post('/api/v1/questions/2/answers')
          .send({
            answer: '',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with invalid request for bad body data', () => {
        request(app).post('/api/v1/questions/1/answers')
          .send({
            foo: '',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with question not found', () => {
        request(app).post('/api/v1/questions/50094/answers')
          .send({
            answer: 'Hi!',
          })
          .end((err, res) => {
            res.should.have.property('status', 404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
    });
    describe('Accept an answer', () => {
      it('respond with data object', () => {
        request(app).post('/api/v1/questions/1/answers/accept')
          .send({
            answer_id: 1,
          })
          .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
          });
      });
      it('respond with invalid request for empty body data', () => {
        request(app).post('/api/v1/questions/1/answers/accept')
          .send({
            answer_id: '',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with invalid request for bad body data', () => {
        request(app).post('/api/v1/questions/1/answers/accept')
          .send({
            foo: '',
          })
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with answer not found', () => {
        request(app).post('/api/v1/questions/50094/answers')
          .send({
            answer: 11435543,
          })
          .end((err, res) => {
            res.should.have.property('status', 404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
    });
  });
  describe('Test question routes', () => {
    describe('Fetch question', () => {
      it('respond with json containing list of all questions', () => {
        request(app).get('/api/v1/questions')
          .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('array');
            res.body[0].should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
          });
      });
      it('respond with selected question', () => {
        request(app).get('/api/v1/questions/1')
          .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
          });
      });
      it('respond with question not found', () => {
        request(app).get('/api/v1/questions/50094')
          .end((err, res) => {
            res.should.have.property('status', 404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with invalid request', () => {
        request(app).get('/api/v1/questions/1f')
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
    });
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
            res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
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
    describe('Update a question', () => {
      it('respond with updated question', () => {
        request(app).put('/api/v1/questions/1')
          .send({
            title: 'Mocha Test Question Updated',
            context: 'Mocha Test Body of Question Updated Ok!',
          })
          .end((err, res) => {
            res.should.have.property('status', 200);
            res.body.should.be.a('object');
            res.body.should.have.any.keys('id', 'title', 'context', 'answers', 'selected', 'createdAt', 'updatedAt');
            res.body.title.should.equal('Mocha Test Question Updated');
            res.body.context.should.equal('Mocha Test Body of Question Updated Ok!');
          });
      });
      it('respond with invalid request for empty body data', () => {
        request(app).put('/api/v1/questions/1989789')
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
        request(app).put('/api/v1/questions/1')
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
      it('respond with question not found', () => {
        request(app).put('/api/v1/questions/50094')
          .send({
            title: 'Mocha Test Question Updated',
            context: 'Mocha Test Body of Question Updated Ok!',
          })
          .end((err, res) => {
            res.should.have.property('status', 404);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
    });
    describe('Delete a question', () => {
      it('respond with invalid request', () => {
        request(app).get('/api/v1/questions/1f')
          .end((err, res) => {
            res.should.have.property('status', 400);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('error');
          });
      });
      it('respond with delete succesfull status', () => {
        request(app).delete('/api/v1/questions/1')
          .end((err, res) => {
            res.should.have.property('status', 204);
          });
      });
      it('respond with question not found', () => {
        request(app).delete('/api/v1/questions/50094')
          .end((err, res) => {
            res.should.have.property('status', 404);
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

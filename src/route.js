import express from 'express';
import QuestionController from './controller/question';
import AnswerController from './controller/answer';
import ErrorHandler from './controller/error';
import pool from './dbconnect';

const router = express.Router();


router.get('/', (request, response) => {
  const question = new QuestionController();
  response.status(200).json(question.getAllQuestions());
});

router.post('/', (request, response, next) => {
  const { title, context } = request.body;
  if (!title || !context) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const question = new QuestionController();
  return response.status(201).json(question.addQuestion(title, context));
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params;
  const question = new QuestionController();
  return response.status(200).json(question.getQuestion(id, next));
});

router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { title, context } = request.body;
  if (!title || !context) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const question = new QuestionController();
  return question.updateQuestion(id, title, context, response, next);
});

router.delete('/:id', (request, response, next) => {
  const { id } = request.params;
  const question = new QuestionController();
  return question.deleteQuestion(id, response, next);
});

router.post('/:id/answers', (request, response, next) => {
  const { id } = request.params;
  const { answer: input } = request.body;
  if (!input) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const answer = new AnswerController();
  return answer.addAnswer(id, input, response, next);
});

router.post('/:id/answers/accept', (request, response, next) => {
  const { id } = request.params;
  const { answer_id: answerId } = request.body;
  if (!id || !answerId) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const answer = new AnswerController();
  return answer.acceptAnswer(id, answerId, response, next);
});

router.post('/test', (request, response, next) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('INSERT INTO questions(title, context) VALUES($1, $2) RETURNING *', [request.body.title, request.body.context], (error, res) => {
      done()
      if (error) {
        console.log(error.stack)
      } else {
        response.send(res.rows);
      }
    });
  });
});
export default router;

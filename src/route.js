import express from 'express';
import { getToken, verifyToken } from './jwt';
import QuestionController from './controller/question';
import AnswerController from './controller/answer';
import ErrorHandler from './controller/error';

const router = express.Router();
const checkToken = (request, response, next) => {
  const bearer = request.headers.authorization;
  const token = getToken(bearer);
  if (!token) {
    const err = new Error('Access denied, token required');
    err.status = 403;
    next(err);
  }
  request.token = token;
  next();
};

router.get('/', (request, response) => {
  const question = new QuestionController();
  return question.getAllQuestions(response);
});

router.post('/', checkToken, (request, response, next) => {
  const result = verifyToken(request.token);
  if (!result.status) {
    return next(new ErrorHandler(result.data, 400));
  }
  let { title, context } = request.body;
  title = title.trim().replace(/\s+/g, ' ');
  context = context.trim().replace(/\s+/g, ' ');
  if (!title || !context) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const question = new QuestionController();
  return question.addQuestion(title, context, result.data, response);
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params;
  const question = new QuestionController();
  return question.getQuestion(id, response, next);
});

router.delete('/:id', checkToken, (request, response, next) => {
  const result = verifyToken(request.token);
  if (!result.status) {
    return next(new ErrorHandler(result.data, 400));
  }
  const { id } = request.params;
  const question = new QuestionController();
  return question.deleteQuestion(id, result.data, response, next);
});

router.post('/:id/answers', checkToken, (request, response, next) => {
  const result = verifyToken(request.token);
  if (!result.status) {
    return next(new ErrorHandler(result.data, 400));
  }
  const { id } = request.params;
  let { answer: input } = request.body;
  input = input.trim().replace(/\s+/g, ' ');
  if (!input) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const answer = new AnswerController();
  return answer.addAnswer(id, result.data, input, response, next);
});

export default router;

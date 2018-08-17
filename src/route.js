import express from 'express';
import QuestionController from './controller/question';
import AnswerController from './controller/answer';
import ErrorHandler from './controller/error';

const router = express.Router();


router.get('/', (req, res) => {
  const question = new QuestionController();
  res.status(200).json(question.getAllQuestions());
});

router.post('/', (req, res, next) => {
  const { title, context } = req.body;
  if (!title || !context) return next(new ErrorHandler('Invalid Request', 400));
  const question = new QuestionController();
  res.status(201).json(question.addQuestion(title, context));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const question = new QuestionController();
  res.status(200).json(question.getQuestion(id, next));
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, context } = req.body;
  if (!title || !context) return next(new ErrorHandler('Invalid Request', 400));
  const question = new QuestionController();
  return question.updateQuestion(id, title, context, res, next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const question = new QuestionController();
  return question.deleteQuestion(id, res, next);
});

router.post('/:id/answers', (req, res, next) => {
  const { id } = req.params;
  const { answer: input } = req.body;
  if (!input) return next(new ErrorHandler('Invalid Request', 400));
  const answer = new AnswerController();
  return answer.addAnswer(id, input, res, next);
});

router.post('/:id/answers/accept', (req, res, next) => {
  const { id } = req.params;
  const { answer_id: answerId } = req.body;
  if (!id || !answerId) return next(new ErrorHandler('Invalid Request', 400));
  const answer = new AnswerController();
  return answer.acceptAnswer(id, answerId, res, next);
});

export default router;

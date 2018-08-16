import express from 'express';
import QuestionController from './controller/question';
import AnswerController from './controller/answer';
import ErrorHandler from './controller/error';

const router = express.Router();


router.get('/', (req, res) => {
  const question = new QuestionController();
  res.status(200).json(question.getAllQuestions());
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const question = new QuestionController();
  res.status(200).json(question.getQuestion(id, next));
});

router.post('/', (req, res, next) => {
  const { title, context } = req.body;
  if (!title || !context) return next(new ErrorHandler('Invalid Request', 400));
  const question = new QuestionController();
  res.status(201).json(question.addQuestion(title, context));
});

router.post('/:id/answers', (req, res, next) => {
  const { id } = req.params;
  const { answer: input } = req.body;
  const answer = new AnswerController();
  res.status(201).json(answer.addAnswer(id, input, next));
});

export default router;

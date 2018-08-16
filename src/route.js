import express from 'express';
import QuestionController from './controller/question';
import AnswerController from './controller/answer';

const router = express.Router();


router.get('/', (req, res) => {
  const question = new QuestionController();
  res.status(200).json(question.getAllQuestions());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const question = new QuestionController();
  res.status(200).json(question.getQuestion(id));
});

router.post('/', (req, res) => {
  const { title, context } = req.body;
  const question = new QuestionController();
  res.status(201).json(question.addQuestion(title, context));
});

router.post('/:id/answers', (req, res) => {
  const { id } = req.params;
  const { answer: input } = req.body;
  const answer = new AnswerController();
  res.status(201).json(answer.addAnswer(id, input));
});


export default router;

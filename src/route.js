import express from 'express';
import { QuestionController } from './controller/question';
import { AnswerController } from './controller/answer';

const router = express.Router();


router.get('/', (req, res) => {
    const question = new QuestionController();
    res.status(200).json(question.getAllQuestions());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const question = new QuestionController();
    const selected = question.getQuestion(id);
    res.status(200).json(selected);
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const body = req.body.context;
    const question = new QuestionController();
    const selected = question.addQuestion(title, body);
    res.status(200).json(selected);
});

router.post('/:id/answers', (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    const answer = new AnswerController();
    const selected = answer.addAnswer(id,data);
    res.status(200).json(selected);
});


export { router };
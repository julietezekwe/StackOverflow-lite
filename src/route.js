import express from 'express';
const router = express.Router();

import { QuestionController } from './controller/question';

router.get('/', (req, res) => {
    const question = new QuestionController();
    res.status(200).json(question.getAllQuestions());
});

export { router };
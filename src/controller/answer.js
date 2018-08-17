import store from '../model/store';
import ErrorHandler from './error';

export default class AnswerController {
  constructor() {
    this.store = store;
    this.activeQuestion = null;
  }

  addAnswer(id, answer, res, next) {    
    if (Number.isNaN(Number(id))) return next(new ErrorHandler('Invalid Request', 400));
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) return next(new ErrorHandler('Resource Not Found', 404));
    const data = this.createAnswerObject(answer);
    this.activeQuestion.answers.push(data);
    return res.status(201).json(data);
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  createAnswerObject(answer) {
    const id = this.getId();
    return {
      id,
      answer,
    };
  }

  getId() {
    return (this.activeQuestion.answers.length + 1);
  }
}

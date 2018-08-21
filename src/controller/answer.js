import store from '../model/store';
import ErrorHandler from './error';
import DateTime from './date';

export default class AnswerController {
  constructor() {
    this.store = store;
    this.activeQuestion = null;
  }

  addAnswer(id, answer, response, next) {
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) {
      return next(new ErrorHandler('Resource Not Found', 404));
    }
    const data = this.createAnswerObject(answer);
    this.activeQuestion.answers.push(data);
    return response.status(201).json(data);
  }

  acceptAnswer(id, answerId, response, next) {
    if (Number.isNaN(Number(id)) || Number.isNaN(Number(answerId))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion || (!this.checkAnswerId(answerId))) {
      return next(new ErrorHandler('Resource Not Found', 404));
    }
    this.activeQuestion.selected = answerId;
    return response.status(200).json(this.activeQuestion);
  }

  createAnswerObject(answer) {
    const id = this.getId();
    const date = new DateTime();
    const createdAt = date.getDate();
    return {
      id,
      answer,
      createdAt,
    };
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  getId() {
    return (this.activeQuestion.answers.length + 1);
  }

  checkAnswerId(id) {
    return this.activeQuestion.answers.some(item => item.id === id);
  }
}

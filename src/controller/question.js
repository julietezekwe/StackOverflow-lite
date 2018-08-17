import store from '../model/store';
import ErrorHandler from './error';

export default class QuestionController {
  constructor() {
    this.store = store;
    this.activeQuestion = null;
  }

  getAllQuestions() {
    return this.store;
  }

  getQuestion(id, next) {
    if (Number.isNaN(Number(id))) return next(new ErrorHandler('Invalid Request', 400));
    const data = this.findQuestion(id);
    return (data) || next(new ErrorHandler('Resource Not Found', 404));
  }

  addQuestion(title, context) {
    const data = this.createQuestionObject(title, context);
    store.push(data);
    return data;
  }

  updateQuestion(id, title, context, res, next) {
    if (Number.isNaN(Number(id))) return next(new ErrorHandler('Invalid Request', 400));
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) return next(new ErrorHandler('Resource Not Found', 404));
    this.activeQuestion.title = title;
    this.activeQuestion.context = context;
    return res.status(200).json(this.activeQuestion);
  }

  deleteQuestion(id, res, next) {
    if (Number.isNaN(Number(id))) return next(new ErrorHandler('Invalid Request', 400));
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) return next(new ErrorHandler('Resource Not Found', 404));
    const index = this.store.indexOf(this.activeQuestion);
    this.store.splice(index, 1);
    return res.status(204).json({});
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  getId() {
    return (this.store.length + 1);
  }

  createQuestionObject(title, context) {
    const id = this.getId();
    return {
      id,
      title,
      context,
      answers: [],
      selected: null,
    };
  }
}

import store from '../model/store';
import pool from '../dbconnect';
import ErrorHandler from './error';
import DateTime from './date';

export default class QuestionController {
  constructor() {
    this.store = store;
    this.activeQuestion = null;
  }

  getAllQuestions() {
    return this.store;
  }

  getQuestion(id, next) {
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    const data = this.findQuestion(id);
    return (data) || next(new ErrorHandler('Resource Not Found', 404));
  }

  addQuestion(title, context, response) {
    const query = {
      text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
      values: [title, context, 1],
    };
    response.status(201).json(this.runQuery(query));
  }

  updateQuestion(id, title, context, response, next) {
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) {
      return next(new ErrorHandler('Resource Not Found', 404));
    }
    this.activeQuestion.title = title;
    this.activeQuestion.context = context;
    const date = new DateTime();
    this.activeQuestion.updatedAt = date.getDate();
    return response.status(200).json(this.activeQuestion);
  }

  deleteQuestion(id, response, next) {
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    this.activeQuestion = this.findQuestion(id);
    if (!this.activeQuestion) {
      return next(new ErrorHandler('Resource Not Found', 404));
    }
    const index = this.store.indexOf(this.activeQuestion);
    this.store.splice(index, 1);
    return response.status(204).json({});
  }

  findQuestion(id) {
    return this.store.find(item => item.id === parseInt(id, 10));
  }

  getId() {
    return (this.store.length + 1);
  }

  runQuery(query) {
    const date = new DateTime();
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query(query, (error, res) => {
        done();
        if (error) {
          console.log(error.stack);
        }
        const [data] = res.rows[0];
        return data;
      });
    });
  }
}

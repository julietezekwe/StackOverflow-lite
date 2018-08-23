import store from '../model/store';
import pool from '../dbconnect';
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
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query('SELECT * FROM questions WHERE id = $1', [id], (error, res) => {
        if (res.rowCount > 0) {
          client.query('INSERT INTO answers(answer, question_id) VALUES($1, $2) RETURNING *', [answer, id], (erro, reso) => {
            done();
            return response.status(201).json(reso.rows[0]);
          });
        } else {
          return next(new ErrorHandler('Resource Not Found', 404));
        }
      });
    });
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
}

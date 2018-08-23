import pool from '../db/dbconnect';
import ErrorHandler from './error';

export default class QuestionController {
  getAllQuestions(response) {
    const query = {
      text: 'SELECT * FROM questions',
    };
    this.runQuery(query).then(data => response.status(200).json(data.rows));
  }

  getQuestion(id, response, next) {
    this.activeQuestion = null;
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    let query = {
      text: 'SELECT * FROM questions WHERE id = $1',
      values: [id],
    };
    this.result = this.runQuery(query).then((data) => {
      if (data.rowCount < 1) {
        return next(new ErrorHandler('Resource Not Found', 404));
      }
      this.activeQuestion = data.rows[0];
      query = {
        text: 'SELECT * FROM answers WHERE question_id = $1',
        values: [this.activeQuestion.id],
      };
      return this.runQuery(query).then((object) => {
        this.activeQuestion.answers = object.rows;
        return this.activeQuestion;
      });
    });
    return this.result.then(data => response.status(200).json(data));
  }

  addQuestion(title, context, response) {
    const query = {
      text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
      values: [title, context, 1],
    };
    this.runQuery(query).then(data => response.status(201).json(data.rows[0]));
  }

  runQuery(query) {
    this.result = pool.query(query).then(response => response);
    return this.result;
  }
}

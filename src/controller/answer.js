import pool from '../db/dbconnect';
import ErrorHandler from './error';

export default class AnswerController {
  addAnswer(id, answer, response, next) {
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
      query = {
        text: 'INSERT INTO answers(answer, question_id) VALUES($1, $2) RETURNING id, answer',
        values: [answer, id],
      };
      return this.runQuery(query).then(object => object.rows[0]);
    });
    return this.result.then(data => response.status(201).json(data));
  }

  runQuery(query) {
    this.result = pool.query(query).then(response => response);
    return this.result;
  }
}

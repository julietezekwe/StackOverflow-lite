import pool from '../db/dbconnect';
import ErrorHandler from './error';

export default class AnswerController {
  addAnswer(quesId, user, answer, response, next) {
    if (Number.isNaN(Number(quesId))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    let query = {
      text: 'SELECT * FROM questions WHERE id = $1',
      values: [quesId],
    };
    this.result = this.runQuery(query).then((data) => {
      if (data.rowCount < 1) {
        return next(new ErrorHandler('Resource Not Found', 404));
      }
      query = {
        text: 'INSERT INTO answers(answer, question_id, user_id) VALUES($1, $2, $3) RETURNING id, answer, user_id',
        values: [answer, quesId, user.id],
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

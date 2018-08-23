import pool from '../dbconnect';
import ErrorHandler from './error';
import DateTime from './date';

export default class QuestionController {
  getAllQuestions(response) {
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query('SELECT * FROM questions', (error, res) => {
        done();
        if (error) {
          console.log(error.stack);
        }
        return response.status(200).json(res.rows);
      });
    });
  }

  getQuestion(id, response, next) {
    if (Number.isNaN(Number(id))) {
      return next(new ErrorHandler('Invalid Request', 400));
    }
    pool.connect((err, client, done) => {
      client.query('SELECT * FROM questions WHERE id = $1', [id], (error, res) => {
        if (res.rowCount < 1) {
          return next(new ErrorHandler('Resource Not Found', 404));
        }
        client.query('SELECT * FROM answers WHERE question_id = $1', [res.rows[0].id], (error, reso) => {
          done();
          res.rows[0].answers = reso.rows;
          return response.status(200).json(res.rows[0]);
        });
      });
    });
  }

  addQuestion(title, context, response) {
    const query = {
      text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
      values: [title, context, 1],
    };
    return this.runQuery(query, response);
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

  runQuery(query, response) {
    pool.query(query, (error, data) => {
      return response.status(201).json(data.rows[0]);
    });
  }
}

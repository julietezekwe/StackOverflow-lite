import bcrypt from 'bcrypt';
import ErrorHandler from './error';
import pool from '../dbconnect';

export default class LoginController {
  login(email, password, response, next) {
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query('SELECT * FROM users WHERE email = $1', [email], (error, object) => {
        done();
        if (object.rowCount > 0) {
          bcrypt.compare(password, object.rows[0].password, (err, res) => {
            if (!res) {
              return next(new ErrorHandler('Incoreect Password', 404));
            }
            return response.status(200).json({ status: 'success', data: object.rows[0] });
          });
        } else {
          return next(new ErrorHandler('Email not found', 404));
        }
      });
    });
  }
}

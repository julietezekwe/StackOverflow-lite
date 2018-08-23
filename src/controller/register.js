import bcrypt from 'bcrypt';
import ErrorHandler from './error';
import pool from '../dbconnect';

export default class RegisterController {
  constructor() {
    this.saltRounds = 10;
  }

  register(name, email, password, response, next) {
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query('SELECT * FROM users WHERE email = $1', [email], (error, object) => {
        if (object.rowCount < 1) {
          bcrypt.hash(password, this.saltRounds).then((hash) => {
            client.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, email', [name, email, hash], (error, data) => {
              done();
              return response.status(201).json({ status: 'success', data: data.rows[0] });
            });
          });
        } else {
          done();
          return next(new ErrorHandler('Email already in use', 404));
        }
      });
    });
  }
}

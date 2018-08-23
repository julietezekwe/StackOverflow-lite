import bcrypt from 'bcrypt';
import pool from '../db/dbconnect';
import ErrorHandler from './error';

export default class RegisterController {
  constructor() {
    this.saltRounds = 10;
  }

  register(name, email, password, response, next) {
    let query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    return this.runQuery(query).then((data) => {
      if (data.rowCount < 1) {
        return bcrypt.hash(password, this.saltRounds).then((hash) => {
          query = {
            text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, email',
            values: [name, email, hash],
          };
          return this.runQuery(query).then(object => object.rows[0]);
        }).then(obj => response.status(201).json({ status: 'success', data: obj }));
      }
      return next(new ErrorHandler('Email already in use', 404));
    });
  }

  runQuery(query) {
    this.result = pool.query(query).then(response => response);
    return this.result;
  }
}

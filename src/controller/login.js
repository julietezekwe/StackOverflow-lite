import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/dbconnect';
import ErrorHandler from './error';
import { secret } from '../jwt';

export default class LoginController {
  login(userEmail, password, response, next) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [userEmail],
    };
    return this.runQuery(query).then((data) => {
      if (data.rowCount > 0) {
        return bcrypt.compare(password, data.rows[0].password, (err, res) => {
          if (!res) {
            return next(new ErrorHandler('Incorect Password', 404));
          }
          const { id, name, email } = data.rows[0];
          jwt.sign({ id, name, email }, secret, { expiresIn: '10m' }, (err, token) => response.status(200).json({
            data: { id, name, email }, token,
          }));
        });
      }
      return next(new ErrorHandler('Email not found', 404));
    });
  }

  runQuery(query) {
    this.result = pool.query(query).then(response => response);
    return this.result;
  }
}

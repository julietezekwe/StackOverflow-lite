import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/dbconnect';
import ErrorHandler from './error';
import { secret } from '../jwt';

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
            text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email',
            values: [name, email, hash],
          };
          return this.runQuery(query).then(object => object.rows[0]);
        }).then((obj) => {
          jwt.sign(obj, secret, { expiresIn: '10m' }, (err, token) => response.status(201).json({
            status: true,
            data: obj,
            token,
          }));
        });
      }
      return next(new ErrorHandler('Email already in use', 400));
    });
  }

  runQuery(query) {
    this.result = pool.query(query).then(response => response);
    return this.result;
  }
}

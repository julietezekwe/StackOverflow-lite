'use strict';

var _dbconnect = require('./dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dbconnect2.default.query('CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, name VARCHAR(100) not null,  email VARCHAR(100) not null, password VARCHAR(100) not null)');
_dbconnect2.default.query('CREATE TABLE IF NOT EXISTS Questions(id SERIAL PRIMARY KEY, title VARCHAR(100) not null, context TEXT not null, user_id INTEGER REFERENCES users)');
_dbconnect2.default.query('CREATE TABLE IF NOT EXISTS Answers(id SERIAL PRIMARY KEY, answer TEXT not null, question_id INTEGER not null)');
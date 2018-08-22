'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var connectionString = 'postgresql://edu1:admin@123@localhost:5432/stackoverflow';
var pool = new _pg.Pool({
  connectionString: connectionString
});

exports.default = pool;
'use strict';

var _dbconnect = require('./dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
var values = ['brianc', 'brian.m.carlson@gmail.com', 'secret'];
_dbconnect2.default.connect(function (err, client, done) {
  if (err) throw err;
  client.query(text, values, function (error, res) {
    done();
    if (error) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
});
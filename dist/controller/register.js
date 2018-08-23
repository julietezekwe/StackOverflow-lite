'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _dbconnect = require('../dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegisterController = function () {
  function RegisterController() {
    _classCallCheck(this, RegisterController);

    this.saltRounds = 10;
  }

  _createClass(RegisterController, [{
    key: 'register',
    value: function register(name, email, password, response, next) {
      var _this = this;

      _dbconnect2.default.connect(function (err, client, done) {
        if (err) throw err;
        client.query('SELECT * FROM users WHERE email = $1', [email], function (error, object) {
          if (object.rowCount < 1) {
            _bcrypt2.default.hash(password, _this.saltRounds).then(function (hash) {
              client.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, email', [name, email, hash], function (error, data) {
                done();
                return response.status(201).json({ status: 'success', data: data.rows[0] });
              });
            });
          } else {
            done();
            return next(new _error2.default('Email already in use', 404));
          }
        });
      });
    }
  }]);

  return RegisterController;
}();

exports.default = RegisterController;
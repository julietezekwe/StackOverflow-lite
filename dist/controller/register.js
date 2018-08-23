'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dbconnect = require('../db/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

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

      var query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };
      return this.runQuery(query).then(function (data) {
        if (data.rowCount < 1) {
          return _bcrypt2.default.hash(password, _this.saltRounds).then(function (hash) {
            query = {
              text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, email',
              values: [name, email, hash]
            };
            return _this.runQuery(query).then(function (object) {
              return object.rows[0];
            });
          }).then(function (obj) {
            return response.status(201).json({ status: 'success', data: obj });
          });
        }
        return next(new _error2.default('Email already in use', 404));
      });
    }
  }, {
    key: 'runQuery',
    value: function runQuery(query) {
      this.result = _dbconnect2.default.query(query).then(function (response) {
        return response;
      });
      return this.result;
    }
  }]);

  return RegisterController;
}();

exports.default = RegisterController;
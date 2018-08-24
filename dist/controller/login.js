'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbconnect = require('../db/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _jwt = require('../jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(userEmail, password, response, next) {
      var query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [userEmail]
      };
      return this.runQuery(query).then(function (data) {
        if (data.rowCount > 0) {
          return _bcrypt2.default.compare(password, data.rows[0].password, function (err, res) {
            if (!res) {
              return next(new _error2.default('Incorect Password', 404));
            }
            var _data$rows$ = data.rows[0],
                id = _data$rows$.id,
                name = _data$rows$.name,
                email = _data$rows$.email;

            _jsonwebtoken2.default.sign({ id: id, name: name, email: email }, _jwt.secret, { expiresIn: '10m' }, function (err, token) {
              return response.status(200).json({
                data: { id: id, name: name, email: email }, token: token
              });
            });
          });
        }
        return next(new _error2.default('Email not found', 404));
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

  return LoginController;
}();

exports.default = LoginController;
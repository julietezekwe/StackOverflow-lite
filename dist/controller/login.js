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

var LoginController = function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(email, password, response, next) {
      _dbconnect2.default.connect(function (err, client, done) {
        if (err) throw err;
        client.query('SELECT * FROM users WHERE email = $1', [email], function (error, object) {
          done();
          if (object.rowCount > 0) {
            _bcrypt2.default.compare(password, object.rows[0].password, function (err, res) {
              if (!res) {
                return next(new _error2.default('Incoreect Password', 404));
              }
              return response.status(200).json({ status: 'success', data: object.rows[0] });
            });
          } else {
            return next(new _error2.default('Email not found', 404));
          }
        });
      });
    }
  }]);

  return LoginController;
}();

exports.default = LoginController;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _error = require('./controller/error');

var _error2 = _interopRequireDefault(_error);

var _login = require('./controller/login');

var _login2 = _interopRequireDefault(_login);

var _register = require('./controller/register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', function (request, response, next) {
  var _request$body = request.body,
      email = _request$body.email,
      password = _request$body.password;

  if (!email || !password) {
    return next(new _error2.default('Invalid Request', 400));
  }
  email = email.trim().replace(/\s+/g, ' ');
  if (!email || !password) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var authenticate = new _login2.default();
  return authenticate.login(email, password, response, next);
});

router.post('/signup', function (request, response, next) {
  var _request$body2 = request.body,
      name = _request$body2.name,
      email = _request$body2.email,
      password = _request$body2.password;

  if (!name || !email || !password) {
    return next(new _error2.default('Invalid Request', 400));
  }
  name = name.trim().replace(/\s+/g, ' ');
  email = email.trim().replace(/\s+/g, ' ');
  if (!name || !email || !password) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var authenticate = new _register2.default();
  return authenticate.register(name, email, password, response, next);
});

exports.default = router;
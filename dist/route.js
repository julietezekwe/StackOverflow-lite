'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwt = require('./jwt');

var _question = require('./controller/question');

var _question2 = _interopRequireDefault(_question);

var _answer = require('./controller/answer');

var _answer2 = _interopRequireDefault(_answer);

var _error = require('./controller/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var checkToken = function checkToken(request, response, next) {
  var bearer = request.headers.authorization;
  var token = (0, _jwt.getToken)(bearer);
  if (!token) {
    var err = new Error('Access denied, token required');
    err.status = 403;
    next(err);
  }
  request.token = token;
  next();
};

router.get('/', function (request, response) {
  var question = new _question2.default();
  return question.getAllQuestions(response);
});

router.post('/', checkToken, function (request, response, next) {
  var result = (0, _jwt.verifyToken)(request.token);
  if (!result.status) {
    return next(new _error2.default(result.data, 400));
  }
  var _request$body = request.body,
      title = _request$body.title,
      context = _request$body.context;

  title = title.trim().replace(/\s+/g, ' ');
  context = context.trim().replace(/\s+/g, ' ');
  if (!title || !context) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var question = new _question2.default();
  return question.addQuestion(title, context, result.data, response);
});

router.get('/:id', function (request, response, next) {
  var id = request.params.id;

  var question = new _question2.default();
  return question.getQuestion(id, response, next);
});

router.delete('/:id', checkToken, function (request, response, next) {
  var result = (0, _jwt.verifyToken)(request.token);
  if (!result.status) {
    return next(new _error2.default(result.data, 400));
  }
  var id = request.params.id;

  var question = new _question2.default();
  return question.deleteQuestion(id, result.data, response, next);
});

router.post('/:id/answers', checkToken, function (request, response, next) {
  var result = (0, _jwt.verifyToken)(request.token);
  if (!result.status) {
    return next(new _error2.default(result.data, 400));
  }
  var id = request.params.id;
  var input = request.body.answer;

  input = input.trim().replace(/\s+/g, ' ');
  if (!input) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var answer = new _answer2.default();
  return answer.addAnswer(id, result.data, input, response, next);
});

exports.default = router;
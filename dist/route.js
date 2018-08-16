'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('./controller/question');

var _question2 = _interopRequireDefault(_question);

var _answer = require('./controller/answer');

var _answer2 = _interopRequireDefault(_answer);

var _error = require('./controller/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var question = new _question2.default();
  res.status(200).json(question.getAllQuestions());
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  var question = new _question2.default();
  res.status(200).json(question.getQuestion(id, next));
});

router.post('/', function (req, res, next) {
  var _req$body = req.body,
      title = _req$body.title,
      context = _req$body.context;

  if (!title || !context) return next(new _error2.default('Invalid Request', 400));
  var question = new _question2.default();
  res.status(201).json(question.addQuestion(title, context));
});

router.post('/:id/answers', function (req, res, next) {
  var id = req.params.id;
  var input = req.body.answer;

  var answer = new _answer2.default();
  res.status(201).json(answer.addAnswer(id, input, next));
});

exports.default = router;
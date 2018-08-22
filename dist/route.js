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

var _dbconnect = require('./dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  var question = new _question2.default();
  response.status(200).json(question.getAllQuestions());
});

router.post('/', function (request, response, next) {
  var _request$body = request.body,
      title = _request$body.title,
      context = _request$body.context;

  if (!title || !context) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var question = new _question2.default();
  return response.status(201).json(question.addQuestion(title, context));
});

router.get('/:id', function (request, response, next) {
  var id = request.params.id;

  var question = new _question2.default();
  return response.status(200).json(question.getQuestion(id, next));
});

router.put('/:id', function (request, response, next) {
  var id = request.params.id;
  var _request$body2 = request.body,
      title = _request$body2.title,
      context = _request$body2.context;

  if (!title || !context) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var question = new _question2.default();
  return question.updateQuestion(id, title, context, response, next);
});

router.delete('/:id', function (request, response, next) {
  var id = request.params.id;

  var question = new _question2.default();
  return question.deleteQuestion(id, response, next);
});

router.post('/:id/answers', function (request, response, next) {
  var id = request.params.id;
  var input = request.body.answer;

  if (!input) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var answer = new _answer2.default();
  return answer.addAnswer(id, input, response, next);
});

router.post('/:id/answers/accept', function (request, response, next) {
  var id = request.params.id;
  var answerId = request.body.answer_id;

  if (!id || !answerId) {
    return next(new _error2.default('Invalid Request', 400));
  }
  var answer = new _answer2.default();
  return answer.acceptAnswer(id, answerId, response, next);
});

router.post('/test', function (request, response, next) {
  _dbconnect2.default.connect(function (err, client, done) {
    if (err) throw err;
    client.query('INSERT INTO questions(title, context) VALUES($1, $2) RETURNING *', [request.body.title, request.body.context], function (error, res) {
      done();
      if (error) {
        console.log(error.stack);
      } else {
        response.send(res.rows);
      }
    });
  });
});
exports.default = router;
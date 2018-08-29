'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbconnect = require('../db/dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, [{
    key: 'getAllQuestions',
    value: function getAllQuestions(response) {
      var query = {
        text: 'SELECT * FROM questions'
      };
      this.runQuery(query).then(function (data) {
        return response.status(200).json(data.rows);
      });
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(id, response, next) {
      var _this = this;

      this.activeQuestion = null;
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      var query = {
        text: 'SELECT * FROM questions WHERE id = $1',
        values: [id]
      };
      this.result = this.runQuery(query).then(function (data) {
        if (data.rowCount < 1) {
          return next(new _error2.default('Resource Not Found', 404));
        }
        _this.activeQuestion = data.rows[0];
        query = {
          text: 'SELECT * FROM answers WHERE question_id = $1',
          values: [_this.activeQuestion.id]
        };
        return _this.runQuery(query).then(function (object) {
          _this.activeQuestion.answers = object.rows;
          return _this.activeQuestion;
        });
      });
      return this.result.then(function (data) {
        return response.status(200).json(data);
      });
    }
  }, {
    key: 'addQuestion',
    value: function addQuestion(title, context, user, response) {
      var query = {
        text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
        values: [title, context, user.id]
      };
      this.runQuery(query).then(function (data) {
        return response.status(201).json(data.rows[0]);
      });
    }
  }, {
    key: 'deleteQuestion',
    value: function deleteQuestion(id, user, response, next) {
      var _this2 = this;

      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      var query = {
        text: 'SELECT * FROM questions WHERE id = $1',
        values: [id]
      };
      return this.runQuery(query).then(function (data) {
        if (data.rowCount < 1) {
          return next(new _error2.default('Question not found', 404));
        }
        if (data.rows[0].user_id !== user.id) {
          return next(new _error2.default('Unauthorized action', 403));
        }
        query = {
          text: 'DELETE FROM questions WHERE id = $1',
          values: [id]
        };
        return _this2.runQuery(query).then(function () {
          return _this2.result.then(function () {
            return response.status(200).json({ status: true, message: 'Question successful' });
          });
        });
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

  return QuestionController;
}();

exports.default = QuestionController;
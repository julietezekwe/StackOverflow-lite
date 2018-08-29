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

var AnswerController = function () {
  function AnswerController() {
    _classCallCheck(this, AnswerController);
  }

  _createClass(AnswerController, [{
    key: 'addAnswer',
    value: function addAnswer(quesId, user, answer, response, next) {
      var _this = this;

      if (Number.isNaN(Number(quesId))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      var query = {
        text: 'SELECT * FROM questions WHERE id = $1',
        values: [quesId]
      };
      return this.runQuery(query).then(function (data) {
        if (data.rowCount < 1) {
          return next(new _error2.default('Resource Not Found', 404));
        }
        if (data.rows[0].user_id === user.id) {
          return next(new _error2.default('You cannot answer your question', 400));
        }
        query = {
          text: 'INSERT INTO answers(answer, question_id, user_id) VALUES($1, $2, $3) RETURNING id, answer, user_id',
          values: [answer, quesId, user.id]
        };
        return _this.runQuery(query).then(function (object) {
          return response.status(201).json(object.rows[0]);
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

  return AnswerController;
}();

exports.default = AnswerController;
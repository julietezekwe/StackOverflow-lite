'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('../model/store');

var _store2 = _interopRequireDefault(_store);

var _dbconnect = require('../dbconnect');

var _dbconnect2 = _interopRequireDefault(_dbconnect);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, [{
    key: 'getAllQuestions',
    value: function getAllQuestions(response) {
      _dbconnect2.default.connect(function (err, client, done) {
        if (err) throw err;
        client.query('SELECT * FROM questions', function (error, res) {
          done();
          if (error) {
            console.log(error.stack);
          }
          return response.status(200).json(res.rows);
        });
      });
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(id, response, next) {
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      _dbconnect2.default.connect(function (err, client, done) {
        client.query('SELECT * FROM questions WHERE id = $1', [id], function (error, res) {
          if (res.rowCount < 1) {
            return next(new _error2.default('Resource Not Found', 404));
          }
          client.query('SELECT * FROM answers WHERE question_id = $1', [res.rows[0].id], function (error, reso) {
            done();
            res.rows[0].answers = reso.rows;
            return response.status(200).json(res.rows[0]);
          });
        });
      });
    }
  }, {
    key: 'addQuestion',
    value: function addQuestion(title, context, response) {
      var query = {
        text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
        values: [title, context, 1]
      };
      return this.runQuery(query, response);
    }
  }, {
    key: 'deleteQuestion',
    value: function deleteQuestion(id, response, next) {
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      this.activeQuestion = this.findQuestion(id);
      if (!this.activeQuestion) {
        return next(new _error2.default('Resource Not Found', 404));
      }
      var index = this.store.indexOf(this.activeQuestion);
      this.store.splice(index, 1);
      return response.status(204).json({});
    }
  }, {
    key: 'runQuery',
    value: function runQuery(query, response) {
      _dbconnect2.default.query(query, function (error, data) {
        return response.status(201).json(data.rows[0]);
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;
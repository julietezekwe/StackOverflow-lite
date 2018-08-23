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

var AnswerController = function () {
  function AnswerController() {
    _classCallCheck(this, AnswerController);

    this.store = _store2.default;
    this.activeQuestion = null;
  }

  _createClass(AnswerController, [{
    key: 'addAnswer',
    value: function addAnswer(id, answer, response, next) {
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      _dbconnect2.default.connect(function (err, client, done) {
        if (err) throw err;
        client.query('SELECT * FROM questions WHERE id = $1', [id], function (error, res) {
          if (res.rowCount > 0) {
            client.query('INSERT INTO answers(answer, question_id) VALUES($1, $2) RETURNING *', [answer, id], function (erro, reso) {
              done();
              return response.status(201).json(reso.rows[0]);
            });
          } else {
            return next(new _error2.default('Resource Not Found', 404));
          }
        });
      });
    }
  }, {
    key: 'acceptAnswer',
    value: function acceptAnswer(id, answerId, response, next) {
      if (Number.isNaN(Number(id)) || Number.isNaN(Number(answerId))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      this.activeQuestion = this.findQuestion(id);
      if (!this.activeQuestion || !this.checkAnswerId(answerId)) {
        return next(new _error2.default('Resource Not Found', 404));
      }
      this.activeQuestion.selected = answerId;
      return response.status(200).json(this.activeQuestion);
    }
  }, {
    key: 'createAnswerObject',
    value: function createAnswerObject(answer) {
      var id = this.getId();
      var date = new _date2.default();
      var createdAt = date.getDate();
      return {
        id: id,
        answer: answer,
        createdAt: createdAt
      };
    }
  }, {
    key: 'findQuestion',
    value: function findQuestion(id) {
      return this.store.find(function (item) {
        return item.id === parseInt(id, 10);
      });
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.activeQuestion.answers.length + 1;
    }
  }, {
    key: 'checkAnswerId',
    value: function checkAnswerId(id) {
      return this.activeQuestion.answers.some(function (item) {
        return item.id === id;
      });
    }
  }]);

  return AnswerController;
}();

exports.default = AnswerController;
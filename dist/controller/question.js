'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

    this.store = _store2.default;
    this.activeQuestion = null;
  }

  _createClass(QuestionController, [{
    key: 'getAllQuestions',
    value: function getAllQuestions() {
      return this.store;
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(id, next) {
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      var data = this.findQuestion(id);
      return data || next(new _error2.default('Resource Not Found', 404));
    }
  }, {
    key: 'addQuestion',
    value: function addQuestion(title, context, response) {
      var query = {
        text: 'INSERT INTO questions(title, context, user_id) VALUES($1, $2, $3) RETURNING *',
        values: [title, context, 1]
      };
      response.status(201).json(this.runQuery(query));
    }
  }, {
    key: 'updateQuestion',
    value: function updateQuestion(id, title, context, response, next) {
      if (Number.isNaN(Number(id))) {
        return next(new _error2.default('Invalid Request', 400));
      }
      this.activeQuestion = this.findQuestion(id);
      if (!this.activeQuestion) {
        return next(new _error2.default('Resource Not Found', 404));
      }
      this.activeQuestion.title = title;
      this.activeQuestion.context = context;
      var date = new _date2.default();
      this.activeQuestion.updatedAt = date.getDate();
      return response.status(200).json(this.activeQuestion);
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
    key: 'findQuestion',
    value: function findQuestion(id) {
      return this.store.find(function (item) {
        return item.id === parseInt(id, 10);
      });
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.store.length + 1;
    }
  }, {
    key: 'runQuery',
    value: function runQuery(query) {
      var date = new _date2.default();
      _dbconnect2.default.connect(function (err, client, done) {
        if (err) throw err;
        client.query(query, function (error, res) {
          done();
          if (error) {
            console.log(error.stack);
          }

          var _res$rows$ = _slicedToArray(res.rows[0], 1),
              data = _res$rows$[0];

          return data;
        });
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;
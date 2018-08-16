'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('../model/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);

    this.store = _store2.default;
  }

  _createClass(QuestionController, [{
    key: 'getAllQuestions',
    value: function getAllQuestions() {
      return this.store;
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(id) {
      var data = this.findQuestion(id);
      return data || false;
    }
  }, {
    key: 'addQuestion',
    value: function addQuestion(title, context) {
      var data = this.createQuestionObject(title, context);
      _store2.default.push(data);
      return data;
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
    key: 'createQuestionObject',
    value: function createQuestionObject(title, context) {
      var id = this.getId();
      return {
        id: id,
        title: title,
        context: context,
        answers: []
      };
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;
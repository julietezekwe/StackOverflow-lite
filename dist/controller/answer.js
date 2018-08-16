'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('../model/store');

var _store2 = _interopRequireDefault(_store);

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
    value: function addAnswer(id, answer) {
      this.activeQuestion = this.findQuestion(id);
      var data = this.createAnswerObject(answer);
      this.activeQuestion.answers.push(data);
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
    key: 'createAnswerObject',
    value: function createAnswerObject(answer) {
      var id = this.getId();
      return {
        id: id,
        answer: answer
      };
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.activeQuestion.answers.length + 1;
    }
  }]);

  return AnswerController;
}();

exports.default = AnswerController;
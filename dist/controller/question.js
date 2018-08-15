'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuestionController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('../model/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = exports.QuestionController = function () {
    function QuestionController() {
        _classCallCheck(this, QuestionController);
    }

    _createClass(QuestionController, [{
        key: 'getAllQuestions',
        value: function getAllQuestions() {
            return _store2.default;
        }
    }, {
        key: 'getQuestion',
        value: function getQuestion(id) {
            var question = _store2.default.find(function (item) {
                return item.id === parseInt(id);
            });
            return question ? question : false;
        }
    }, {
        key: 'addQuestion',
        value: function addQuestion(title, context) {
            var question = {
                id: _store2.default.length + 1,
                title: title,
                context: context,
                answers: []
            };
            _store2.default.push(question);
            return question;
        }
    }]);

    return QuestionController;
}();
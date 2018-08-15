'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('./controller/question');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    var question = new _question.QuestionController();
    res.status(200).json(question.getAllQuestions());
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    var question = new _question.QuestionController();
    var selected = question.getQuestion(id);
    res.status(200).json(selected);
});

router.post('/', function (req, res) {

    var title = req.body.title;
    var body = req.body.context;
    var question = new _question.QuestionController();
    var selected = question.addQuestion(title, body);
    res.status(200).json(selected);
});

exports.router = router;
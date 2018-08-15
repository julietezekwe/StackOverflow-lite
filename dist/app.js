'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.address = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./route');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var baseUrl = '/api/v1/questions';
app.use(_express2.default.json());

//routes
app.use(baseUrl, _route.router);

var port = process.env.PORT || 3000;
var address = exports.address = app.listen(port, function () {
  return console.log('Listening on port ' + port + '...');
});
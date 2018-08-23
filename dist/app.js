'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var baseUrl = '/api/v1/questions';
app.use(_express2.default.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  next();
});

app.use('/api/v1/auth', _auth2.default);
app.use(baseUrl, _route2.default);

app.use(function (req, res, next) {
  var err = new Error('No Route Match Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});
var port = process.env.PORT || 3000;
var address = app.listen(port, function () {
  return console.log('Listening on port ' + port + '...');
});
exports.default = address;
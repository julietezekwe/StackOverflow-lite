'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.getToken = exports.secret = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'R^2$IXFRQW~88[u';

var getToken = function getToken(bearer) {
  if (!bearer) {
    return false;
  }
  var token = bearer.split(' ')[1];
  return token;
};

var verifyToken = function verifyToken(token) {
  return _jsonwebtoken2.default.verify(token, secret, function (error, data) {
    if (error) {
      return {
        status: false,
        data: error.message
      };
    }
    return {
      status: true,
      data: data
    };
  });
};

exports.secret = secret;
exports.getToken = getToken;
exports.verifyToken = verifyToken;
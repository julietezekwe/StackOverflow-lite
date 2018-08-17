"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorHandler = function ErrorHandler(message, code) {
  _classCallCheck(this, ErrorHandler);

  var err = new Error(message);
  err.status = code;
  return err;
};

exports.default = ErrorHandler;
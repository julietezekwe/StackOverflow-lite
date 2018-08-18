"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTime = function () {
  function DateTime() {
    _classCallCheck(this, DateTime);
  }

  _createClass(DateTime, [{
    key: "getDate",
    value: function getDate() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();

      return year + "-" + this.formatDate(month) + "-" + this.formatDate(day) + " " + this.formatDate(hours) + ":" + this.formatDate(minutes) + ":" + this.formatDate(seconds);
    }
  }, {
    key: "formatDate",
    value: function formatDate(param) {
      return param < 10 ? "0" + param : param;
    }
  }]);

  return DateTime;
}();

exports.default = DateTime;
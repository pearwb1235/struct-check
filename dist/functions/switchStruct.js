"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchStructChecker = switchStructChecker;

var _checkerChunk = _interopRequireDefault(require("../checkerChunk"));

var _record = _interopRequireDefault(require("../record"));

function switchStructChecker(switchFn, rules) {
  return function (value) {
    var ruleKey = switchFn(value);

    if (ruleKey in rules) {
      var record = new _record["default"]();
      new _checkerChunk["default"](rules[ruleKey], value, record);
      return record;
    } else return "Is not a valid value";
  };
}
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Checker: true,
  CheckerChunk: true,
  CheckerRecord: true
};
exports["default"] = checkStruct;
Object.defineProperty(exports, "Checker", {
  enumerable: true,
  get: function get() {
    return _checker["default"];
  }
});
Object.defineProperty(exports, "CheckerChunk", {
  enumerable: true,
  get: function get() {
    return _checkerChunk["default"];
  }
});
Object.defineProperty(exports, "CheckerRecord", {
  enumerable: true,
  get: function get() {
    return _record["default"];
  }
});

var _checker = _interopRequireDefault(require("./checker"));

var _functions = require("./functions");

Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _functions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functions[key];
    }
  });
});

var _checkerChunk = _interopRequireDefault(require("./checkerChunk"));

var _record = _interopRequireDefault(require("./record"));

function checkStruct(obj, checkRule) {
  var checker = new _checker["default"](checkRule, obj);
  return checker.record.get();
}
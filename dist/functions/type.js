"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeChecker = typeChecker;
exports.typeStructChecker = typeStructChecker;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _checkerChunk = _interopRequireDefault(require("../checkerChunk"));

var _record = _interopRequireDefault(require("../record"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function typeChecker(require) {
  for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    types[_key - 1] = arguments[_key];
  }

  return function (value, meta) {
    if (require === false && (!meta.has || value === null || value === undefined)) return "";
    if (!meta.has) return "Require.";
    if (!Array.isArray(types) || types.length === 0) return true;

    var _iterator = _createForOfIteratorHelper(types),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var type = _step.value;

        switch (type) {
          case "array":
            if (Array.isArray(value)) return true;
            break;

          default:
            if ((0, _typeof2["default"])(value) === type) return true;
            break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return "Must to be a/an ".concat(types.join(", "), " type.");
  };
}

function typeStructChecker(require, typeWithRule) {
  var typeCheck = typeChecker.apply(void 0, [require].concat((0, _toConsumableArray2["default"])(Object.keys(typeWithRule))));
  return function (value, meta) {
    var result = typeCheck(value, meta);
    if (typeof result === "string" && result.length > 0 || typeof result !== "string" && !result) return result;
    var record = new _record["default"]();
    var rules = typeWithRule[(0, _typeof2["default"])(value)];
    new _checkerChunk["default"](rules, value, record);
    return record;
  };
}
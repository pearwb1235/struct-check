"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _checkerChunk = _interopRequireDefault(require("./checkerChunk"));

var _record = _interopRequireDefault(require("./record"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function arrayToObject(list, handler) {
  var result = {};

  var _iterator = _createForOfIteratorHelper(list),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _key = _step.value;
      result[_key] = typeof handler === "function" ? handler(_key) : handler;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

var Checker = /*#__PURE__*/function () {
  function Checker(checkRule, obj, record) {
    (0, _classCallCheck2["default"])(this, Checker);
    (0, _defineProperty2["default"])(this, "success", void 0);
    (0, _defineProperty2["default"])(this, "record", void 0);
    this.success = true;
    this.record = record !== null && record !== void 0 ? record : new _record["default"]();
    this.check(checkRule, obj);
  }

  (0, _createClass2["default"])(Checker, [{
    key: "addRecord",
    value: function addRecord(message) {
      this.success = false;
      return this.record.add(message);
    }
  }, {
    key: "check",
    value: function check(checkRule, obj) {
      if ((0, _typeof2["default"])(obj) !== "object") {
        if (typeof checkRule === "undefined") return;
        if ((0, _typeof2["default"])(checkRule) === "object" && Object.keys(checkRule).length === 0) return;
        this.addRecord("Not object.");
        return;
      } else if (Array.isArray(obj)) {
        this.addRecord("Not object.");
        return;
      }

      if ((0, _typeof2["default"])(checkRule) !== "object") throw new Error("The argument `checkRule` must to be an object.");
      var objKeys = arrayToObject(Object.keys(obj));

      var _iterator2 = _createForOfIteratorHelper(this.record.node(checkRule)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _key2 = _step2.value;
          delete objKeys[_key2];
          if (!new _checkerChunk["default"](checkRule[_key2], obj[_key2], this.record, {
            has: _key2 in obj
          }).success) this.success = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(this.record.node(objKeys)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          (0, _objectDestructuringEmpty2["default"])(_step3.value);
          this.record.add("Redundant.");
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);
  return Checker;
}();

exports["default"] = Checker;
//# sourceMappingURL=checker.js.map
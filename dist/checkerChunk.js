"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck")
);

var _createClass2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createClass")
);

var _defineProperty2 = _interopRequireDefault(
  require("@babel/runtime/helpers/defineProperty")
);

var _checker = _interopRequireDefault(require("./checker"));

var _record = _interopRequireDefault(require("./record"));

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var CheckerChunk = /*#__PURE__*/ (function () {
  function CheckerChunk(rules, value, record) {
    var meta =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck2["default"])(this, CheckerChunk);
    (0, _defineProperty2["default"])(this, "record", void 0);
    (0, _defineProperty2["default"])(this, "success", void 0);
    (0, _defineProperty2["default"])(this, "meta", void 0);
    this.record = record;
    this.success = true;
    this.meta = meta;

    if (Array.isArray(rules)) {
      var _iterator = _createForOfIteratorHelper(rules),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var rule = _step.value;

          if (!this.check(value, rule)) {
            this.success = false;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (!this.check(value, rules)) this.success = false;
  }

  (0, _createClass2["default"])(CheckerChunk, [
    {
      key: "check",
      value: function check(value, rule) {
        switch ((0, _typeof2["default"])(rule)) {
          case "object":
            if (
              (0, _typeof2["default"])(value) !== "object" ||
              Array.isArray(value)
            )
              return this.record.add("Must to be an object");
            return new _checker["default"](rule, value, this.record).success;

          case "function":
            var result = rule(value, this.meta);

            if (result instanceof _record["default"]) {
              var record = result.get();

              for (var key in record) {
                this.record.add(record[key], key);
              }

              return Object.keys(record).length === 0;
            } else if (typeof result === "string") {
              if (result.length > 0) return this.record.add(result);
            } else if (!result)
              return this.record.add("Checker function match failed.");

            return true;

          default:
            throw new Error("The argument `rule` is not valid.");
        }

        return true;
      },
    },
  ]);
  return CheckerChunk;
})();

exports["default"] = CheckerChunk;
//# sourceMappingURL=checkerChunk.js.map

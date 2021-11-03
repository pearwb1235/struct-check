"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var CheckerRecord = /*#__PURE__*/function () {
  function CheckerRecord() {
    (0, _classCallCheck2["default"])(this, CheckerRecord);
    (0, _defineProperty2["default"])(this, "records", void 0);
    (0, _defineProperty2["default"])(this, "nodes", void 0);
    this.nodes = [];
    this.records = {};
  }

  (0, _createClass2["default"])(CheckerRecord, [{
    key: "node",
    value: /*#__PURE__*/_regenerator["default"].mark(function node(obj) {
      var index, key;
      return _regenerator["default"].wrap(function node$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!((0, _typeof2["default"])(obj) !== "object")) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (!Array.isArray(obj)) {
                _context.next = 14;
                break;
              }

              _context.t0 = _regenerator["default"].keys(obj);

            case 4:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 12;
                break;
              }

              index = _context.t1.value;
              this.nodes.push(index);
              _context.next = 9;
              return index;

            case 9:
              this.nodes.pop();
              _context.next = 4;
              break;

            case 12:
              _context.next = 23;
              break;

            case 14:
              _context.t2 = _regenerator["default"].keys(obj);

            case 15:
              if ((_context.t3 = _context.t2()).done) {
                _context.next = 23;
                break;
              }

              key = _context.t3.value;
              this.nodes.push(key);
              _context.next = 20;
              return key;

            case 20:
              this.nodes.pop();
              _context.next = 15;
              break;

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, node, this);
    })
  }, {
    key: "add",
    value: function add(message, node) {
      if (typeof node === "string" && node.length > 0) {
        this.records[this.nodes.join(".") + "." + node] = message;
      } else {
        this.records[this.nodes.join(".")] = message;
      }

      return false;
    }
  }, {
    key: "get",
    value: function get() {
      return this.records;
    }
  }]);
  return CheckerRecord;
}();

exports["default"] = CheckerRecord;
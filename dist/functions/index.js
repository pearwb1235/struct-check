"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayStruct = require("./arrayStruct");

Object.keys(_arrayStruct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _arrayStruct[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _arrayStruct[key];
    }
  });
});

var _switchStruct = require("./switchStruct");

Object.keys(_switchStruct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _switchStruct[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _switchStruct[key];
    }
  });
});

var _type = require("./type");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _type[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _type[key];
    }
  });
});
//# sourceMappingURL=index.js.map
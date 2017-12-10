"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$uuid = $uuid;

var _uuid = require("uuid");

var uuid = _interopRequireWildcard(_uuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function $uuid() {
  return uuid.v4().toString();
} /** Created by ge on 4/3/16. */
//# sourceMappingURL=$uuid.js.map
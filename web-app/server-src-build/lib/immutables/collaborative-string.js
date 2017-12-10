"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.INSERT = exports.KEYS = undefined;
exports.insert = insert;
exports.del = del;
exports.transform = transform;

var _charInt = require("./charInt");

"use strict"; /** Created by ge on 1/14/17.
               * immutable Array and helper functions
               *
               */
var KEYS = exports.KEYS = {
  type: 't'
};
// operation types
var INSERT = exports.INSERT = 'ins';
var DELETE = exports.DELETE = 'del';

// operations
function insert(string, cursor, start, end, ins) {
  if (typeof end === "undefined") end = start;
  return {
    string: string.slice(0, start) + ins + string.slice(end),
    cursor: cursor < start ? cursor : cursor + start + ins.length
  };
}

function del(string, cursor, start, end) {
  return {
    string: string.slice(0, start) + string.slice(end),
    cursor: cursor < start ? cursor : cursor < end ? start : start + cursor - end
  };
}

// transform the second operation w.r.t. the first
function transform(op1, op2) {
  var k1 = op1[KEYS.type];
  var k2 = op2[KEYS.type];
  if (k1 === INSERT && k2 === INSERT) {} else if (k1 === DELETE && k2 === INSERT) {} else if (k1 === INSERT && k2 === DELETE) {} else if (k1 === DELETE && k2 === DELETE) {}
}
//# sourceMappingURL=collaborative-string.js.map
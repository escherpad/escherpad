/** Created by ge on 1/14/17. */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.int2char = int2char;
exports.char2int = char2int;
exports.add = add;
exports.sub = sub;
var CHAR_SET = exports.CHAR_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function int2char(int) {
  return int.toString().map(function (d) {
    return CHAR_SET[toInteger(d)];
  }).join('');
}

function char2int(strings) {
  return toInteger(strings.map(function (char) {
    return CHAR_SET.indexOf(char).toString();
  }).join(''));
}

function add(chars, b) {
  if (!chars) return int2char(b);
  return int2char(char2int(chars) + b);
}

function sub(chars, b) {
  return add(chars, -b);
}
//# sourceMappingURL=charInt.js.map
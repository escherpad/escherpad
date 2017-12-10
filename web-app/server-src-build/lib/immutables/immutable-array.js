"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 1/14/17.
                                                                                                                                                                                                                                                                   * immutable Array and helper functions
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   */


exports.isImmutableArray = isImmutableArray;
exports.del = del;
exports.ins = ins;

var _charInt = require("./charInt");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

"use strict";
function isImmutableArray(obj) {
  return obj && obj._keys;
}

/* an edit generates an undo stack.
edit: [20, " hi!"]
undo: [20, {d: 4}]

edit: [20, {d: 4}]
undo: [20, " hi!"]
 */
// operations
function del(array, anchor, caret) {
  if (anchor === caret) return array;
  return _extends({}, array, {
    _keys: [].concat(_toConsumableArray(array._keys.slice(0, Math.min(anchor, caret))), _toConsumableArray(array._keys.slice(Math.max(anchor, caret))))
  });
}

function ins(index, value, _key) {
  if (!_key) _key = (0, _charInt.add)(this._maxKey, 1);
  return _extends({}, this, _defineProperty({
    _maxKey: _key,
    _keys: [].concat(_toConsumableArray(this._keys.slice(0, index)), [_key], _toConsumableArray(this._keys.slice(index)))
  }, _key, value));
}
//# sourceMappingURL=immutable-array.js.map
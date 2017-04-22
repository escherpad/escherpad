/** Created by ge on 1/14/17.
 * immutable Array and helper functions
 *
 */
import {add} from "./charInt";

"use strict";
export function isImmutableArray(obj) {
  return (obj && obj._keys);
}

/* an edit generates an undo stack.
edit: [20, " hi!"]
undo: [20, {d: 4}]

edit: [20, {d: 4}]
undo: [20, " hi!"]
 */
// operations
export function del(array, anchor, caret) {
  if (anchor === caret) return array;
  return {
    ...array,
    _keys: [
      ...array._keys.slice(0, Math.min(anchor, caret)),
      ...array._keys.slice(Math.max(anchor, caret)),
    ]
  }
}

export function ins(index, value, _key) {
  if (!_key) _key = add(this._maxKey, 1);
  return {
    ...this,
    _maxKey: _key,
    _keys: [
      ...this._keys.slice(0, index),
      _key,
      ...this._keys.slice(index)],
    [_key]: value
  }
}

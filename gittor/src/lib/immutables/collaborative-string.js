/** Created by ge on 1/14/17.
 * immutable Array and helper functions
 *
 */
import {add} from "./charInt";

"use strict";
export const KEYS = {
  type: 't',
};
// operation types
export const INSERT = 'ins';
export const DELETE = 'del';

// operations
export function insert(string, cursor, start, end, ins) {
  if (typeof end === "undefined") end = start;
  return {
    string: string.slice(0, start) + ins + string.slice(end),
    cursor: (cursor < start) ? cursor : cursor + start + ins.length
  };
}

export function del(string, cursor, start, end) {
  return {
    string: string.slice(0, start) + string.slice(end),
    cursor: (cursor < start) ? cursor :
      (cursor < end) ? start : start + cursor - end
  };
}

// transform the second operation w.r.t. the first
export function transform(op1, op2) {
  let k1 = op1[KEYS.type];
  let k2 = op2[KEYS.type];
  if (k1 === INSERT && k2 === INSERT) {
  } else if (k1 === DELETE && k2 === INSERT) {
  } else if (k1 === INSERT && k2 === DELETE) {
  } else if (k1 === DELETE && k2 === DELETE) {
  }
}


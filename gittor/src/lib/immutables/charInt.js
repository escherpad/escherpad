/** Created by ge on 1/14/17. */
"use strict";

export const CHAR_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export function int2char(int) {
  return int.toString().map(d => CHAR_SET[toInteger(d)]).join('');
}

export function char2int(strings) {
  return toInteger(strings.map(char => CHAR_SET.indexOf(char).toString()).join(''));
}

export function add(chars, b) {
  if (!chars) return int2char(b);
  return int2char(char2int(chars) + b);
}

export function sub(chars, b) {
  return add(chars, -b);
}

/** Created by ge on 5/31/16. */

import {$uuid} from "./../utils/$uuid";

function validateBindr(bindr) {
  "use strict";
  return true;
}
function key(bindr) {
  "use strict";
  return bindr.id
}

export function bindrs(state = [], action) {
  "use strict";
  if (action.type === "UPSERT_BINDR") {
    let {bindr} = action;
    if (!validateBindr(bindr)) return state;
    if (!bindr.id) var _bindr = {...bindr, id: $uuid()};
    let newState = {...state};
    newState[key(bindr)] = _bindr;
    return newState;
  } else if (action.type === "DELETE_BINDR") {
    let {bindr} = action;
    if (!validateBindr(bindr)) return state;
    let newState = {...state};
    delete newState[key(bindr)];
    return newState;
  } else {
    return state;
  }
}

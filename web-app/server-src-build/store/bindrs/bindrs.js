"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 5/31/16. */

exports.bindrs = bindrs;

var _$uuid = require("./../utils/$uuid");

function validateBindr(bindr) {
  "use strict";

  return true;
}
function key(bindr) {
  "use strict";

  return bindr.id;
}

function bindrs() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  if (action.type === "UPSERT_BINDR") {
    var bindr = action.bindr;

    if (!validateBindr(bindr)) return state;
    if (!bindr.id) var _bindr = _extends({}, bindr, { id: (0, _$uuid.$uuid)() });
    var newState = _extends({}, state);
    newState[key(bindr)] = _bindr;
    return newState;
  } else if (action.type === "DELETE_BINDR") {
    var _bindr2 = action.bindr;

    if (!validateBindr(_bindr2)) return state;
    var _newState = _extends({}, state);
    delete _newState[key(_bindr2)];
    return _newState;
  } else {
    return state;
  }
}
//# sourceMappingURL=bindrs.js.map
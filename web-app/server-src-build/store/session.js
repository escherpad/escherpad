"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = session;

var _$uuid = require("../lib/$uuid");

var sessionInitialState = {
  agent: (0, _$uuid.$uuid)(),
  user: "Ge Yang",
  channel: "Escher-demo"
}; /** Created by ge on 4/3/16. */
function session() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sessionInitialState;
  var action = arguments[1];

  return state;
}
//# sourceMappingURL=session.js.map
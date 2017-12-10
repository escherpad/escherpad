"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewMode = viewMode;
/** Created by ge on 4/27/16. */

function viewMode() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "zen-mode";
  var action = arguments[1];

  if (action.type === "SET_ZEN_MODE") {
    return "zen-mode";
  } else if (action.type === "SET_FULL_VIEW") {
    return "full-view";
  } else {
    return state;
  }
}
//# sourceMappingURL=viewMode.js.map
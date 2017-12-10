"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobileSafari = isMobileSafari;
/** Created by ge on 1/19/17. */
function isMobileSafari() {
  "use strict";

  return !!navigator.userAgent.match(/(iPhone|iPad|iPod)/i);
}
//# sourceMappingURL=isMobileSafari.js.map
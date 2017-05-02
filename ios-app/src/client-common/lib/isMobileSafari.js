/** Created by ge on 1/19/17. */
export function isMobileSafari() {
  "use strict";
  return !!navigator.userAgent.match(/(iPhone|iPad|iPod)/i);
}

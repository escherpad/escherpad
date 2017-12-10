'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ellipsizeMiddle = ellipsizeMiddle;
/** Created by ge on 12/30/16. */
function ellipsizeMiddle(input, limit) {
  /* We can't provide a 100% expected result if the limit is less than 3. For example:
   * If the limit == 2:
   * Should we display the first at last character without an ellipses in the middle?
   * Should we display just one character and an ellipses before or after?
   * Should we display nothing at all?
    * If the limit == 1:
   * Should we display just one character?
   * Should we display just an ellipses?
   * Should we display nothing at all?
   * Etc.
   */
  if (limit < 3) {
    throw new Error('middleEllipses: Limit should be at least 3');
  }

  // Do nothing, the string doesn't need truncation.
  if (input.length <= limit) {
    return input;
  }

  var lengthOfTheSidesAfterTruncation = Math.floor((limit - 1) / 2);
  var finalLeftPart = input.slice(0, lengthOfTheSidesAfterTruncation);
  var finalRightPart = input.slice(input.length - lengthOfTheSidesAfterTruncation);

  return finalLeftPart + MIDDLE_ELLIPSES_CHARACTER + finalRightPart;
}
//# sourceMappingURL=ellipsize.js.map
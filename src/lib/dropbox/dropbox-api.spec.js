/** Created by ge on 6/7/16. */
import {get} from "./dropbox-api.js";

describe("Test Suite", function () {
  "use strict";
  it("should be able to assert truth", function (done) {
    expect(true).toBe(true);
    console.log(get);
    done();
  })
});

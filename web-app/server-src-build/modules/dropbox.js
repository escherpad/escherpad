"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLIENT_ID = exports.REDIRECT_URI = undefined;

var _eywaDropbox = require("eywa-dropbox");

var _eywaDropbox2 = _interopRequireDefault(_eywaDropbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDIRECT_URI = exports.REDIRECT_URI = "http://localhost:4000/gittor/oauth/dropbox-redirect.html";
// export const REDIRECT_URI = `${window.location.href}oauth/dropbox-redirect.html`;
/** Created by ge on 12/4/16. */

console.warn('TODO: window.location.href is not supported on the server. Need to place this into a compoment!');
var CLIENT_ID = exports.CLIENT_ID = "kroubcx0l6slseu";

var dapi = new _eywaDropbox2.default(CLIENT_ID, REDIRECT_URI);
exports.default = dapi;
//# sourceMappingURL=dropbox.js.map
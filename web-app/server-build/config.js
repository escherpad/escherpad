"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PORT = exports.PUBLIC_DIR = exports.NODE_ENV = undefined;

require("dotenv/config");

var NODE_ENV = process.env.NODE_ENV || 'dev'; /** Created by ge on 12/8/17. */

var PUBLIC_DIR = process.env.PUBLIC_DIR || "../web-build";
var PORT = process.env.PORT || 3001;

exports.NODE_ENV = NODE_ENV;
exports.PUBLIC_DIR = PUBLIC_DIR;
exports.PORT = PORT;
//# sourceMappingURL=config.js.map
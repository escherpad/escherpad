"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoInitialState = undefined;

var _demoPost = require("./posts/demoPost");

var _demoPost2 = _interopRequireDefault(_demoPost);

var _editor = require("./editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Created by ge on 4/9/16. */

var demoInitialState = exports.demoInitialState = {
  editor: _editor.editorInitialState,
  posts: {}
};

demoInitialState.editor.postId = _demoPost2.default.id;
demoInitialState.posts[_demoPost2.default.id] = _demoPost2.default;
//# sourceMappingURL=demoInitialState.js.map
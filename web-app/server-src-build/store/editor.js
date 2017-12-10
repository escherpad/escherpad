"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorInitialState = exports.UPDATE_EDITOR_OPTIONS = exports.SELECT_POST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 4/7/16. */


exports.editor = editor;

var _posts = require("./posts/posts");

var SELECT_POST = exports.SELECT_POST = "SELECT_POST";
var UPDATE_EDITOR_OPTIONS = exports.UPDATE_EDITOR_OPTIONS = "UPDATE_EDITOR_OPTIONS";

var editorInitialState = exports.editorInitialState = {
  options: {
    palattes: {
      color: "#23aaff",
      SimplePen: {
        strokeWidth: 2
      },
      Eraser: {
        minWidth: 2,
        maxWidth: 100,
        strokeWidth: 40
      }
    },
    keyboardHandler: "",
    theme: "chrome",
    fontSize: 12,
    lineHeight: 2
  }
};
function editor() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : editorInitialState;
  var action = arguments[1];

  if (!action.type) return state;
  if (action.type === SELECT_POST) {
    return _extends({}, state, { postId: action.postId
    });
  } else if (action.type === UPDATE_EDITOR_OPTIONS) {
    if (!action.options) return state;
    return _extends({}, state, {
      options: _extends({}, state.options, action.options)
    });
  } else if (action.type === _posts.UPDATE_POST) {
    if (action.post.$updatedId && action.post.id === state.postId) {
      return _extends({}, state, { postId: action.post.$updatedId
      });
    }
    return state;
  } else {
    return state;
  }
}
//# sourceMappingURL=editor.js.map
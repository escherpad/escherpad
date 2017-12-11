"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n    position: relative;\n    display: inline-block;\n    border-radius: 4px;\n    font-size: ", ";\n    line-height: ", ";\n    padding: 0 7px;\n    top: -1px;\n    &.clickable, &.badge-with-control {\n        cursor: pointer;\n    }\n\n"], ["\n    position: relative;\n    display: inline-block;\n    border-radius: 4px;\n    font-size: ", ";\n    line-height: ", ";\n    padding: 0 7px;\n    top: -1px;\n    &.clickable, &.badge-with-control {\n        cursor: pointer;\n    }\n\n"]);

exports.default = BadgeWithControl;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /** Created by ge on 5/15/16. */


var height = "20px";
var fontSize = "12px";
var Styled = (0, _styledComponents2.default)("span")(_templateObject, fontSize, height);
function BadgeWithControl(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      children = _ref.children,
      text = _ref.text,
      _props = _objectWithoutProperties(_ref, ["className", "children", "text"]);

  if (className) className += " badge";else className = "badge";
  if (_props.onClick) className += " clickable";
  return _react2.default.createElement(
    Styled,
    _extends({ className: className }, _props),
    text || children
  );
}
//# sourceMappingURL=Badge.js.map
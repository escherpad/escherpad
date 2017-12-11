"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n    box-sizing: border-box;\n    font-size: 10px;\n    line-height: ", " - 2px;\n    height: ", ";\n    border-radius: 6px;\n    padding: 0 4px 0 4px;\n    cursor: pointer;\n    transition: all 0.05s linear;\n\n    color: white;\n    //text-shadow: 0 0 1px #007ee5;\n    background-color: fade_out(", ", 0);\n    &:hover {\n        color: white;\n        background-color: ", ";\n    }\n    &:active {\n        background-color: darken(", ", 10%);\n    }\n    // standard\n    border: 0px solid rgba(white, 0);\n"], ["\n    box-sizing: border-box;\n    font-size: 10px;\n    line-height: ", " - 2px;\n    height: ", ";\n    border-radius: 6px;\n    padding: 0 4px 0 4px;\n    cursor: pointer;\n    transition: all 0.05s linear;\n\n    color: white;\n    //text-shadow: 0 0 1px #007ee5;\n    background-color: fade_out(", ", 0);\n    &:hover {\n        color: white;\n        background-color: ", ";\n    }\n    &:active {\n        background-color: darken(", ", 10%);\n    }\n    // standard\n    border: 0px solid rgba(white, 0);\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Badge = require("./Badge");

var _Badge2 = _interopRequireDefault(_Badge);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /** Created by ge on 5/15/16. */


var height = "16px";
var color = "#23aaff";
var Styled = (0, _styledComponents2.default)(_Badge2.default)(_templateObject, height, height, color, color, color);

function BlueBadge(_ref) {
    var className = _ref.className,
        _props = _objectWithoutProperties(_ref, ["className"]);

    return _react2.default.createElement(Styled, _extends({ className: "small-blue-badge " + className }, _props));
}

exports.default = BlueBadge;
//# sourceMappingURL=BlueBadge.js.map
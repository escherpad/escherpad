"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n        padding-right: ", ";\n        :last-child {\n            position: absolute;\n            top: 0;  right: 0;\n            width: ", ";\n            margin: 0 auto;\n            font-size: ", ";\n            line-height: ", ";\n            text-align: center;\n        }\n"], ["\n        padding-right: ", ";\n        :last-child {\n            position: absolute;\n            top: 0;  right: 0;\n            width: ", ";\n            margin: 0 auto;\n            font-size: ", ";\n            line-height: ", ";\n            text-align: center;\n        }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Badge = require("./Badge");

var _Badge2 = _interopRequireDefault(_Badge);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /** Created by ge on 5/15/16. */


var height = "20px";
var fontSize = "12px";
var Styled = (0, _styledComponents2.default)(_Badge2.default)(_templateObject, height, height, fontSize, height);

/**
 * The easiest way to style the component is by tagging it with CSS class.
 * */
function BadgeWithControl(_ref) {
    var className = _ref.className,
        icon = _ref.icon,
        children = _ref.children,
        text = _ref.text,
        onIconClick = _ref.onIconClick,
        props = _objectWithoutProperties(_ref, ["className", "icon", "children", "text", "onIconClick"]);

    return _react2.default.createElement(
        Styled,
        _extends({ className: "badge badge-with-control " + (className || "") }, props),
        text || children,
        icon || _react2.default.createElement("i", { className: "material-icons", onClick: onIconClick })
    );
}

exports.default = BadgeWithControl;
//# sourceMappingURL=BadgeWithControl.js.map
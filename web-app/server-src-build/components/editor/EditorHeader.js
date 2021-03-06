"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n"], ["\n"]);

exports.default = EditorHeader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
function EditorHeader(props) {
    return _react2.default.createElement(
        Styled,
        _extends({ fill: true, row: true }, props),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true },
            "editor header"
        )
    );
}
//# sourceMappingURL=EditorHeader.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n  border-bottom: solid 0.5px #c5c5c5;\n"], ["\n  border-bottom: solid 0.5px #c5c5c5;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n    font-size: 1em;\n    cursor: pointer;\n    border: solid 1px transparent;\n    background-color: transparent;\n    flex: 0 0;\n    display: flex; \n    flex-direction: row;\n    align-items: center;\n    > svg {\n      margin-left: 0.2em;\n      color: #5d5d5d;\n    }\n    &:hover, &:active {\n    color: #23aaff;\n    text-shadow: 0 0 3px #23aaff;\n        > svg {\n          color: #23aaff;\n          filter: drop-shadow(0 0 3px #23aaff);\n        }\n    }\n"], ["\n    font-size: 1em;\n    cursor: pointer;\n    border: solid 1px transparent;\n    background-color: transparent;\n    flex: 0 0;\n    display: flex; \n    flex-direction: row;\n    align-items: center;\n    > svg {\n      margin-left: 0.2em;\n      color: #5d5d5d;\n    }\n    &:hover, &:active {\n    color: #23aaff;\n    text-shadow: 0 0 3px #23aaff;\n        > svg {\n          color: #23aaff;\n          filter: drop-shadow(0 0 3px #23aaff);\n        }\n    }\n"]);

exports.default = ListTabs;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _index = require("react-icons/lib/go/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
var StyledButton = (0, _styledComponents2.default)("button")(_templateObject2);
function ListTabs(props) {
    return _react2.default.createElement(
        Styled,
        _extends({ fill: true, row: true }, props),
        _react2.default.createElement(
            StyledButton,
            null,
            _react2.default.createElement(
                _layoutComponents.FlexItem,
                null,
                "yours"
            ),
            _react2.default.createElement(_layoutComponents.FlexItem, { component: _index.GoTriangleDown })
        ),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null),
        _react2.default.createElement(
            StyledButton,
            null,
            _react2.default.createElement(
                _layoutComponents.FlexItem,
                null,
                "recent"
            ),
            _react2.default.createElement(_layoutComponents.FlexItem, { component: _index.GoTriangleDown })
        )
    );
}
//# sourceMappingURL=ListTabs.js.map
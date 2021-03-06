"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    font-family: 'Lato', sans-serif;\n    background-color: #23aaff;\n    \n    * {\n        color: white;\n        text-align: center;\n    }\n     h1 {\n        font-size: 120px;\n        margin: 0;\n    }\n     h2 {\n        font-size: 24px;\n    }\n     p {\n        font-size: 20px;\n    }\n"], ["\n    font-family: 'Lato', sans-serif;\n    background-color: #23aaff;\n    \n    * {\n        color: white;\n        text-align: center;\n    }\n     h1 {\n        font-size: 120px;\n        margin: 0;\n    }\n     h2 {\n        font-size: 24px;\n    }\n     p {\n        font-size: 20px;\n    }\n"]);

exports.default = NoMatch;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactHelmet = require("react-helmet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
function NoMatch(props) {
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true },
        _react2.default.createElement(
            _reactHelmet.Helmet,
            null,
            _react2.default.createElement(
                "title",
                null,
                "Page Not Found"
            )
        ),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true, component: 'div' },
            _react2.default.createElement(
                "h1",
                null,
                "404"
            ),
            _react2.default.createElement(
                "h2",
                null,
                "Welcome To The No-man Land!"
            ),
            _react2.default.createElement(
                "p",
                null,
                "This address does not exist"
            )
        ),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null)
    );
}
//# sourceMappingURL=404.js.map
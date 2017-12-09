"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    font-family: 'Lato', sans-serif;\n    background-color: #efefef\n"], ["\n    font-family: 'Lato', sans-serif;\n    background-color: #efefef\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    > span {\n        color: black;\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2px;\n        border-top: solid 4px transparent;\n        border-bottom: solid 4px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 4px black;\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    > span {\n        color: black;\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2px;\n        border-top: solid 4px transparent;\n        border-bottom: solid 4px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 4px black;\n    }\n"]);

exports.default = FrontPage;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactHelmet = require("react-helmet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
var HeaderButton = (0, _styledComponents2.default)(_layoutComponents.FlexItem)(_templateObject2);
function FrontPage(props) {
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true, style: { backgroundImage: "linear-gradient(-40deg, #FF008C, #E1FF00)" }, align: "stretch" },
        _react2.default.createElement(
            _reactHelmet.Helmet,
            null,
            _react2.default.createElement(
                "title",
                null,
                "Welcome to Escherpad"
            )
        ),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true },
            _react2.default.createElement(
                _layoutComponents.Flex,
                { row: true, style: {
                        height: "70px", padding: "0 40px", maxWidth: "1000px", left: 0, right: 0,
                        margin: "0 auto"
                    } },
                _react2.default.createElement(
                    HeaderButton,
                    { component: "a" },
                    _react2.default.createElement(
                        "span",
                        { style: { fontSize: "19px" } },
                        "Escherpad"
                    )
                ),
                _react2.default.createElement(_layoutComponents.FlexSpacer, null),
                _react2.default.createElement(
                    HeaderButton,
                    { component: "a", href: "/findr" },
                    _react2.default.createElement(
                        "span",
                        null,
                        "Findr"
                    )
                ),
                _react2.default.createElement(
                    HeaderButton,
                    { component: "a", href: "/notes" },
                    _react2.default.createElement(
                        "span",
                        null,
                        "Notes"
                    )
                ),
                _react2.default.createElement(
                    HeaderButton,
                    { component: "a", href: "/todo" },
                    _react2.default.createElement(
                        "span",
                        null,
                        "Todo List"
                    )
                )
            )
        )
    );
}
//# sourceMappingURL=FrontPage.js.map
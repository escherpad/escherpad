"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    font-family: 'Lato', sans-serif;\n    background-color: #efefef\n"], ["\n    font-family: 'Lato', sans-serif;\n    background-color: #efefef\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    > span {\n        color: white;\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2px;\n        border-top: solid 4px transparent;\n        border-bottom: solid 4px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 4px white;\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    > span {\n        color: white;\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2px;\n        border-top: solid 4px transparent;\n        border-bottom: solid 4px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 4px white;\n    }\n"]);

exports.default = Findr;

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
function Findr(props) {
    var listSections = [];
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true, style: { backgroundImage: "linear-gradient(140deg, #006EFF, #00FFD5)" }, align: "stretch" },
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
                        "Findr"
                    )
                ),
                _react2.default.createElement(_layoutComponents.FlexSpacer, null),
                _react2.default.createElement(
                    HeaderButton,
                    { component: "a", href: "settings" },
                    _react2.default.createElement(
                        "span",
                        null,
                        "settings"
                    )
                )
            )
        ),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true },
            _react2.default.createElement(
                _layoutComponents.Flex,
                { row: true, align: "stretch", style: {
                        height: "43px", padding: "0 40px", maxWidth: "1000px", left: 0, right: 0,
                        margin: "0 auto"
                    } },
                _react2.default.createElement(_layoutComponents.FlexItem, { component: "input", fluid: true, type: "Text",
                    style: {
                        borderRadius: "14px", border: "solid 1px transparent",
                        marginRight: "10px",
                        padding: "0 14px",
                        color: "#4198ED",
                        fontSize: "1em"
                    } }),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    { component: "button", href: "settings", style: {
                            cursor: "pointer",
                            backgroundColor: "transparent", fontSize: "1em",
                            textDecoration: "none", color: "white", padding: "0 15px", lineHeight: "40px",
                            border: "solid 1px white", borderRadius: "10px",
                            marginLeft: "10px"
                        } },
                    "find"
                )
            )
        ),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null),
        _react2.default.createElement(_layoutComponents.FlexSpacer, null)
    );
}
//# sourceMappingURL=Findr.js.map
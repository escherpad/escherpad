"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n    font-family: 'Lato', sans-serif;\n    font-size: 1em;\n    background-color: #efefef\n"], ["\n    font-family: 'Lato', sans-serif;\n    font-size: 1em;\n    background-color: #efefef\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    &:not(:first-child) {\n      margin-left: 1em;\n      padding-left: 0.2em;\n    }\n    &:not(:last-child) {\n      margin-right: 1em;\n      padding-right: 0.2em;\n    }\n    > span {\n        height: 2em;\n        line-height: 2em;\n        color: white;\n        flex: 0 0 auto;\n        border-top: solid 0.3em transparent;\n        border-bottom: solid 0.3em transparent;\n    }\n    :hover > span {\n        border-bottom: solid 0.3em white;\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    &:not(:first-child) {\n      margin-left: 1em;\n      padding-left: 0.2em;\n    }\n    &:not(:last-child) {\n      margin-right: 1em;\n      padding-right: 0.2em;\n    }\n    > span {\n        height: 2em;\n        line-height: 2em;\n        color: white;\n        flex: 0 0 auto;\n        border-top: solid 0.3em transparent;\n        border-bottom: solid 0.3em transparent;\n    }\n    :hover > span {\n        border-bottom: solid 0.3em white;\n    }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactHelmet = require("react-helmet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
var HeaderButton = (0, _styledComponents2.default)(_layoutComponents.FlexItem)(_templateObject2);

var Findr = function (_Component) {
    _inherits(Findr, _Component);

    function Findr() {
        _classCallCheck(this, Findr);

        var _this = _possibleConstructorReturn(this, (Findr.__proto__ || Object.getPrototypeOf(Findr)).call(this));

        _this.onSearch = _this._onSearch.bind(_this);

        return _this;
    }

    _createClass(Findr, [{
        key: "_onSearch",
        value: function _onSearch(query) {
            console.log(query, this.state);
        }
    }, {
        key: "render",
        value: function render() {
            var results = [
            //todo: define flow schema.
            {
                source: "google-scholar",
                title: "SGAN: An Alternative Training of Generative Adversarial Networks",
                authors: ["Tatjana Chavdarova", "François Fleuret"],
                date: "2017-12-06",
                arxiv_category: ["stat.ML", "cs.LG"]
            }];
            console.log(results);
            return _react2.default.createElement(
                Styled,
                { fill: true, column: true, style: { backgroundImage: "linear-gradient(140deg, #006EFF, #00FFD5)" }, align: "stretch" },
                _react2.default.createElement(
                    _reactHelmet.Helmet,
                    null,
                    _react2.default.createElement(
                        "title",
                        null,
                        "Findr | Search For All Your Knowledge"
                    )
                ),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    { fixed: true },
                    _react2.default.createElement(
                        _layoutComponents.Flex,
                        { row: true, style: {
                                height: "4em", padding: "0 1.3em", maxWidth: "1000px", left: 0, right: 0,
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
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    { fixed: true },
                    _react2.default.createElement(
                        _layoutComponents.Flex,
                        { column: true, align: "center", style: {
                                fontFamily: "Lato",
                                color: "white",
                                padding: "0 1.3em", maxWidth: "1000px", left: 0, right: 0,
                                margin: "0 auto"
                            } },
                        _react2.default.createElement(
                            "h1",
                            { style: { fontWeight: "200", fontSize: "6em", marginBottom: "0.1em" } },
                            "Findr"
                        ),
                        _react2.default.createElement(
                            "h3",
                            { style: { fontWeight: "200", fontSize: "1.5em", marginTop: "0.1em", marginBottom: "1.3em" } },
                            "Search your knowledge"
                        )
                    )
                ),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    { fixed: true },
                    _react2.default.createElement(
                        _layoutComponents.Flex,
                        { row: true, align: "stretch", style: {
                                height: "2.2em", padding: "0 1.3em", maxWidth: "700px", left: 0, right: 0,
                                margin: "0 auto"
                            } },
                        _react2.default.createElement(_layoutComponents.FlexItem, { component: "input", fluid: true, type: "Text",
                            style: {
                                borderRadius: "1em", border: "solid 1px transparent",
                                marginRight: "0.5em",
                                padding: "0 0.7em",
                                color: "#4198ED",
                                fontSize: "1em"
                            } }),
                        _react2.default.createElement(
                            _layoutComponents.FlexItem,
                            { component: "button", href: "settings", onClick: this.onSearch,
                                style: {
                                    cursor: "pointer",
                                    backgroundColor: "rgba(0, 0, 0, 0.2)", fontSize: "1em",
                                    textDecoration: "none", color: "white", padding: "0 0.7em", lineHeight: "100%",
                                    border: "solid 1px transparent", borderRadius: "1em",
                                    marginLeft: "10px"
                                } },
                            "find"
                        )
                    )
                ),
                _react2.default.createElement(_layoutComponents.FlexSpacer, null)
            );
        }
    }]);

    return Findr;
}(_react.Component);

exports.default = Findr;
//# sourceMappingURL=Findr.js.map
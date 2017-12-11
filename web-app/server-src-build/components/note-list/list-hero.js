"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListHero = exports.ListRightButton = exports.ListLeftButton = undefined;

var _templateObject = _taggedTemplateLiteral(["\n  color: #cfcfcf;\n  background-color: transparent;\n  border: solid 1px transparent;\n  border-radius: 4em;\n  cursor: pointer;\n  :hover, :active {\n    color: #23aaff;\n    svg {\n      filter: drop-shadow(0 0 4px #23aaff);\n    }\n  }\n  svg {\n    width: 4em;\n    height: 4em;\n  }\n"], ["\n  color: #cfcfcf;\n  background-color: transparent;\n  border: solid 1px transparent;\n  border-radius: 4em;\n  cursor: pointer;\n  :hover, :active {\n    color: #23aaff;\n    svg {\n      filter: drop-shadow(0 0 4px #23aaff);\n    }\n  }\n  svg {\n    width: 4em;\n    height: 4em;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  font-size: 3em;\n  text-align: center;\n  margin: 0;\n  //margin: 0.7em 0 0.2em;\n"], ["\n  font-size: 3em;\n  text-align: center;\n  margin: 0;\n  //margin: 0.7em 0 0.2em;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _index = require("react-icons/lib/go/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)('button')(_templateObject);

function ListLeftButton(props) {
    return _react2.default.createElement(
        Styled,
        props,
        _react2.default.createElement(_index.GoChevronLeft, null)
    );
}

function ListRightButton(props) {
    return _react2.default.createElement(
        Styled,
        props,
        _react2.default.createElement(_index.GoPlus, null)
    );
}

var HeroSyle = (0, _styledComponents2.default)('h1')(_templateObject2);
function ListHero(props) {
    return _react2.default.createElement(
        HeroSyle,
        props,
        "Notes"
    );
}

exports.ListLeftButton = ListLeftButton;
exports.ListRightButton = ListRightButton;
exports.ListHero = ListHero;
//# sourceMappingURL=list-hero.js.map
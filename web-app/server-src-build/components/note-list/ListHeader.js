"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n    color: #cfcfcf;\n    input::-webkit-input-placeholder {  color: #cfcfcf;  }\n    input::-moz-placeholder {  color: #cfcfcf; opacity: 1; }\n    input:-ms-input-placeholder {  color: #cfcfcf;  }\n    .search-icon {\n        text-align: center;\n        position: absolute !important;\n        z-index: 1;\n        left: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);\n    }\n    .clear-icon {\n        text-align: center;\n        position: absolute !important;\n        z-index: 1;\n        right: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);\n    }\n    input {\n        color: #23aaff;\n        &[value=\"\"] {\n            color: #cfcfcf;\n        }\n        width: 100%;\n        box-sizing: border-box;\n        transition: all 0.3s linear;\n        border: 1px solid rgba(0, 0, 0, 0);\n        &:hover {\n            border: 1px solid #23aaff\n        }\n        &:focus {\n            border: 1px solid #23aaff;\n            outline: none;\n        }\n    }\n"], ["\n    color: #cfcfcf;\n    input::-webkit-input-placeholder {  color: #cfcfcf;  }\n    input::-moz-placeholder {  color: #cfcfcf; opacity: 1; }\n    input:-ms-input-placeholder {  color: #cfcfcf;  }\n    .search-icon {\n        text-align: center;\n        position: absolute !important;\n        z-index: 1;\n        left: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);\n    }\n    .clear-icon {\n        text-align: center;\n        position: absolute !important;\n        z-index: 1;\n        right: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);\n    }\n    input {\n        color: #23aaff;\n        &[value=\"\"] {\n            color: #cfcfcf;\n        }\n        width: 100%;\n        box-sizing: border-box;\n        transition: all 0.3s linear;\n        border: 1px solid rgba(0, 0, 0, 0);\n        &:hover {\n            border: 1px solid #23aaff\n        }\n        &:focus {\n            border: 1px solid #23aaff;\n            outline: none;\n        }\n    }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _index = require("react-icons/lib/go/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)('div')(_templateObject);
var value = "";
var placeholder = "type \"/\" to search...";
var height = 30;
var fontSize = "14";
var padding = "7";

var ListHeader = function (_Component) {
    _inherits(ListHeader, _Component);

    function ListHeader() {
        _classCallCheck(this, ListHeader);

        return _possibleConstructorReturn(this, (ListHeader.__proto__ || Object.getPrototypeOf(ListHeader)).apply(this, arguments));
    }

    _createClass(ListHeader, [{
        key: "onClear",
        value: function onClear() {
            this.props.dispatch({
                type: "SEARCH_CLEAR"
            });
            console.log('clear search bar');
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                style = _props2.style,
                dispatch = _props2.dispatch,
                _props = _objectWithoutProperties(_props2, ["style", "dispatch"]);

            var finalStyle = _extends({}, style, {
                height: height + "px",
                lineHeight: height - 2 + "px",
                borderRadius: height / 2 + "px",
                fontSize: fontSize + "px",
                padding: "0 " + padding + "px",
                paddingLeft: height - 4 + "px",
                paddingRight: height - 4 + "px"
            });
            return _react2.default.createElement(
                "div",
                { style: { margin: "10px", position: "relative" } },
                _react2.default.createElement(
                    Styled,
                    null,
                    _react2.default.createElement(_index.GoSearch, { className: "search-icon" }),
                    _react2.default.createElement("input", _extends({ style: finalStyle, value: value, placeholder: placeholder }, _props)),
                    _react2.default.createElement(_index.GoX, { className: "clear-icon", onClick: this.onClear.bind(this) })
                )
            );
        }
    }]);

    return ListHeader;
}(_react.Component);

exports.default = ListHeader;
//# sourceMappingURL=ListHeader.js.map
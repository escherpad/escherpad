"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n    text-align: right;\n    // standard\n    position: relative;\n    padding: ", " ", ";\n    box-sizing: border-box;\n    cursor: pointer;\n    height: 90px;\n    background-color: white;\n    border-bottom: 1px solid #fafafa; //#e6e6e6\n    margin-bottom: 5px;\n    color: #303030;\n    &:hover, &:active {\n        color: white;\n        background-color: #23aaff;\n        .control-group {\n            z-index: 1;\n        }\n    }\n    &:not(:hover):not(:active) .placeholder {\n        color: #e6e6e6;\n    }\n    .control-group {\n        z-index: -1;\n        position: absolute;\n        top: 0;\n        left: 0;\n        button {\n            padding: 0;\n            cursor: pointer;\n            width: ", ";\n            height: ", ";\n            line-height: ", ";\n            font-size: 24px;\n            // styles\n            color: white;\n            background-color: rgba(black, 0);\n            border: none;\n        }\n        i.material-icons {\n            line-height: ", ";\n        }\n    }\n    .modified-at {\n        line-height: 18px;\n        color: #aaa;\n        font-size: 13px;\n    }\n    &:hover, &:active {\n        .modified-at {\n            color: rgba(white, 0);\n        }\n    }\n}\n"], ["\n    text-align: right;\n    // standard\n    position: relative;\n    padding: ", " ", ";\n    box-sizing: border-box;\n    cursor: pointer;\n    height: 90px;\n    background-color: white;\n    border-bottom: 1px solid #fafafa; //#e6e6e6\n    margin-bottom: 5px;\n    color: #303030;\n    &:hover, &:active {\n        color: white;\n        background-color: #23aaff;\n        .control-group {\n            z-index: 1;\n        }\n    }\n    &:not(:hover):not(:active) .placeholder {\n        color: #e6e6e6;\n    }\n    .control-group {\n        z-index: -1;\n        position: absolute;\n        top: 0;\n        left: 0;\n        button {\n            padding: 0;\n            cursor: pointer;\n            width: ", ";\n            height: ", ";\n            line-height: ", ";\n            font-size: 24px;\n            // styles\n            color: white;\n            background-color: rgba(black, 0);\n            border: none;\n        }\n        i.material-icons {\n            line-height: ", ";\n        }\n    }\n    .modified-at {\n        line-height: 18px;\n        color: #aaa;\n        font-size: 13px;\n    }\n    &:hover, &:active {\n        .modified-at {\n            color: rgba(white, 0);\n        }\n    }\n}\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SmallBlueBadge = require("../badge/SmallBlueBadge");

var _SmallBlueBadge2 = _interopRequireDefault(_SmallBlueBadge);

var _layoutComponents = require("layout-components");

var _Placeholder = require("../Placeholder");

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _BreadCrumBadges = require("./BreadCrumBadges");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /** Created by ge on 4/18/16. */

// import {BreadCrumBadges} from "./BreadCrumBadges";


var topPadding = "15px";
var sidePadding = "6px";
var unitLength = "40px";
var Styled = (0, _styledComponents2.default)('div')(_templateObject, topPadding, sidePadding, unitLength, unitLength, unitLength, unitLength);

var NoteItem = function (_Component) {
    _inherits(NoteItem, _Component);

    function NoteItem() {
        _classCallCheck(this, NoteItem);

        return _possibleConstructorReturn(this, (NoteItem.__proto__ || Object.getPrototypeOf(NoteItem)).apply(this, arguments));
    }

    _createClass(NoteItem, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                searchQuery = _props.searchQuery,
                listParentFolder = _props.listParentFolder,
                id = _props.id,
                title = _props.title,
                source = _props.source,
                presence = _props.presence,
                parentFolder = _props.parentFolder,
                accountKey = _props.accountKey,
                createdAt = _props.createdAt,
                modifiedAt = _props.modifiedAt,
                dispatch = _props.dispatch;


            var timeStamp = void 0;
            if (modifiedAt) timeStamp = (0, _moment2.default)(modifiedAt).fromNow();else if (createdAt) timeStamp = (0, _moment2.default)(createdAt).fromNow();else timeStamp = '';

            var searchQueryRegex = new RegExp(searchQuery, 'ig');
            var highlightedTitle = searchQuery && title && title.match(searchQueryRegex) ? title.replace(searchQueryRegex, "<mark>$&</mark>") : title;

            // notice: add console.log here.
            var displayPath = parentFolder && parentFolder.toLowerCase().match("^" + listParentFolder.toLowerCase()) ? '.' + (parentFolder.slice(listParentFolder.length) || '/') : parentFolder;

            return _react2.default.createElement(
                Styled,
                { className: "post-list-item",
                    onTouchStart: this.selectPost.bind(this),
                    onMouseDown: this.selectPost.bind(this) },
                _react2.default.createElement(
                    "div",
                    { className: "control-group" },
                    _react2.default.createElement(
                        "button",
                        { onClick: this.deletePost },
                        _react2.default.createElement(
                            "i",
                            { className: "material-icons delete-post" },
                            "close"
                        )
                    )
                ),
                _react2.default.createElement(
                    _Placeholder2.default,
                    { className: "post-title",
                        style: { lineHeight: "22px", fontSize: "18px", fontWeight: "700" },
                        isEmpty: !title || title.replace(/(&nbsp;|<br>|<br\/>|<br><\/br>)/g, " ").trim() === "",
                        placeholder: _react2.default.createElement(
                            "em",
                            { className: "placeholder" },
                            "Untitled"
                        ) },
                    _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: highlightedTitle } })
                ),
                _react2.default.createElement(
                    _layoutComponents.Flex,
                    { row: true, style: { justifyContent: "right" }, className: "modified-at" },
                    _react2.default.createElement(
                        _layoutComponents.FlexItem,
                        { fluid: true, style: { overflowX: "hidden" } },
                        accountKey
                        // ? <div>breadcrum bage placeholder</div>
                        ? _react2.default.createElement(_BreadCrumBadges.BreadCrumBadges, { accountKey: accountKey,
                            currentFolder: listParentFolder,
                            displayPath: displayPath,
                            dispatch: dispatch }) : _react2.default.createElement(
                            _SmallBlueBadge2.default,
                            { style: { backgroundColor: "#aaa" } },
                            "LocalStorage"
                        )
                    ),
                    _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, width: "5px" }),
                    _react2.default.createElement(
                        _layoutComponents.FlexItem,
                        { fixed: true },
                        timeStamp
                    )
                )
            );
        }
    }, {
        key: "selectPost",
        value: function selectPost() {
            this.props.dispatch({
                type: "SELECT_POST",
                postId: this.props.id
            });
        }
    }, {
        key: "deletePost",
        value: function deletePost() {
            // todo: show a popup to confirm delete
            this.props.dispatch({
                type: "DELETE_POST",
                id: this.props.id
            });
        }
    }]);

    return NoteItem;
}(_react.Component);

NoteItem.defaultProps = {
    parentFolder: "",
    listParentFolder: ""
};
exports.default = NoteItem;
//# sourceMappingURL=NoteItem.js.map
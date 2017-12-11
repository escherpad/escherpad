"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BreadCrumBadges = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SmallBlueBadge = require("../badge/SmallBlueBadge");

var _SmallBlueBadge2 = _interopRequireDefault(_SmallBlueBadge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** Created by ge on 12/30/16. */

// import {setCurrentFolder} from "../../store/postList";


var BreadCrumBadges = exports.BreadCrumBadges = function (_Component) {
    _inherits(BreadCrumBadges, _Component);

    function BreadCrumBadges() {
        _classCallCheck(this, BreadCrumBadges);

        return _possibleConstructorReturn(this, (BreadCrumBadges.__proto__ || Object.getPrototypeOf(BreadCrumBadges)).apply(this, arguments));
    }

    _createClass(BreadCrumBadges, [{
        key: "goToPath",
        value: function goToPath(path) {
            return function (e) {
                e.stopPropagation();
                e.preventDefault();
                // todo: add back for live version
                // this.props.dispatch(setCurrentFolder(this.props.accountKey, path))
            };
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.currentFolder !== this.props.currentFolder || nextProps.displayPath !== this.props.displayPath;
        }
    }, {
        key: "render",
        value: function render() {
            "use strict";

            var _this2 = this;

            var _props = this.props,
                currentFolder = _props.currentFolder,
                displayPath = _props.displayPath;
            // console.log(currentFolder, displayPath);
            // is relative

            if (displayPath === "./") return _react2.default.createElement(
                _SmallBlueBadge2.default,
                { onClick: this.goToPath(currentFolder) },
                "./"
            );
            if (displayPath.match(/^\.\//)) {
                var paths = displayPath.slice(2).split('/');
                return _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement(
                        _SmallBlueBadge2.default,
                        { onClick: this.goToPath(currentFolder) },
                        "./"
                    ),
                    paths.map(function (folder, ind) {
                        return [_react2.default.createElement(
                            "span",
                            { style: {
                                    color: "#23aaff",
                                    fontWeight: 900,
                                    margin: "10px 2px 0px",
                                    lineHeight: "24px"
                                } },
                            "\u203A"
                        ), _react2.default.createElement(
                            _SmallBlueBadge2.default,
                            {
                                onClick: _this2.goToPath(currentFolder + '/' + paths.slice(0, ind + 1).join('/')) },
                            folder
                        )];
                    })
                );
            } else if (displayPath.match(/^\//)) {
                var _paths = displayPath.slice(1).split('/');
                return _react2.default.createElement(
                    "span",
                    null,
                    _paths.map(function (folder, ind) {
                        return [ind ? // hide the first one
                        _react2.default.createElement(
                            "span",
                            {
                                style: { color: "#23aaff", fontWeight: 900, margin: "10px 2px 0px", lineHeight: "16px" } },
                            "\u203A"
                        ) : null, _react2.default.createElement(
                            _SmallBlueBadge2.default,
                            {
                                onClick: _this2.goToPath('/' + _paths.slice(0, ind + 1).join('/')) },
                            folder
                        )];
                    })
                );
            } else {
                console.warn(displayPath);
                return _react2.default.createElement(
                    "warning",
                    null,
                    "path is malformed"
                );
            }
        }
    }]);

    return BreadCrumBadges;
}(_react.Component);
//# sourceMappingURL=BreadCrumBadges.js.map
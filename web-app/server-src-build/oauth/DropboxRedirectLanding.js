"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dropbox = require("./../modules/dropbox");

var _AccountListView = require("../components/account-list-view/AccountListView");

var _AccountListView2 = _interopRequireDefault(_AccountListView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** Created by ge on 5/14/16. */


var any = _react.PropTypes.any,
    object = _react.PropTypes.object;

var DropoxRedirectLanding = function (_Component) {
  _inherits(DropoxRedirectLanding, _Component);

  function DropoxRedirectLanding() {
    _classCallCheck(this, DropoxRedirectLanding);

    return _possibleConstructorReturn(this, (DropoxRedirectLanding.__proto__ || Object.getPrototypeOf(DropoxRedirectLanding)).apply(this, arguments));
  }

  _createClass(DropoxRedirectLanding, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _props = this.props,
          store = _props.store,
          dapi = _props.dapi;

      var dispatch = store.dispatch.bind(store);

      var _dapi$onRedirect = dapi.onRedirect(),
          hash = _dapi$onRedirect.hash,
          accessToken = _dapi$onRedirect.accessToken,
          tokenType = _dapi$onRedirect.tokenType,
          uid = _dapi$onRedirect.uid,
          state = _dapi$onRedirect.state;

      dispatch({
        type: "UPSERT_ACCOUNT",
        account: { service: "dropbox", uid: uid, accessToken: accessToken, tokenType: tokenType }
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {}
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h1",
          null,
          "Your Dropbox Account Is Linked!"
        ),
        _react2.default.createElement(
          "h2",
          null,
          "Accounts"
        ),
        _react2.default.createElement(
          "p",
          null,
          "You are now connected to the folder:\xA0",
          _react2.default.createElement(
            "strong",
            null,
            "Dropbox",
            _react2.default.createElement(
              "i",
              { className: "material-icons" },
              "chevron_right"
            ),
            "Apps",
            _react2.default.createElement(
              "i",
              { className: "material-icons" },
              "chevron_right"
            ),
            "Gittor"
          ),
          " for the following accounts: "
        ),
        _react2.default.createElement(_AccountListView2.default, this.props)
      );
    }
  }]);

  return DropoxRedirectLanding;
}(_react.Component);

DropoxRedirectLanding.propTypes = {
  location: any,
  params: any,
  store: any.isRequired,
  dapi: any.isRequired
};
exports.default = DropoxRedirectLanding;
//# sourceMappingURL=DropboxRedirectLanding.js.map
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_Root2.default, null)
), document.getElementById('root')); /** All client side bootstrapping happens here, including Browser Router.*/


(0, _registerServiceWorker2.default)();
//# sourceMappingURL=index.js.map
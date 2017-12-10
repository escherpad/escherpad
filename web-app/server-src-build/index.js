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

var _reactAsyncComponent = require('react-async-component');

var _reactAsyncBootstrapper = require('react-async-bootstrapper');

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {} from "./store/index.js";

// note: Store and app states
var rehydrateState = window.ASYNC_COMPONENTS_STATE || (0, _reactAsyncComponent.createAsyncContext)().getState(); /** All client side bootstrapping happens here, including Browser Router.*/


var app = _react2.default.createElement(
    _reactAsyncComponent.AsyncComponentProvider,
    { rehydrateState: rehydrateState },
    _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(_Root2.default, null)
    )
);

// note: This prevents the "flash"  from happening.
(0, _reactAsyncBootstrapper2.default)(app).then(function () {
    _reactDom2.default.render(app, document.getElementById('root'));
});

// todo: might consider putting this inside a timeout to speed up the initial rendering.
// registerServiceWorker();
(0, _registerServiceWorker.unregister)();
//# sourceMappingURL=index.js.map
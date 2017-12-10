"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Root;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Escherpad = require("./pages/Escherpad");

var _Escherpad2 = _interopRequireDefault(_Escherpad);

var _ = require("./pages/404.js");

var _2 = _interopRequireDefault(_);

var _FrontPage = require("./pages/FrontPage");

var _FrontPage2 = _interopRequireDefault(_FrontPage);

var _Todo = require("./pages/Todo");

var _Todo2 = _interopRequireDefault(_Todo);

var _reactAsyncComponent = require("react-async-component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncFindr = (0, _reactAsyncComponent.asyncComponent)({
    resolve: function resolve() {
        return Promise.resolve().then(function () {
            return require('./pages/Findr');
        });
    }
});

function Root() {
    return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: function component() {
                return _react2.default.createElement(_FrontPage2.default, null);
            } }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/findr", component: AsyncFindr }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/todo", component: _Todo2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/notes", component: _Escherpad2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/github/:account/gists/:path*", component: _Escherpad2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/github/:account/:repo/:path*", component: _Escherpad2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/dropbox/:account/:path*", component: _Escherpad2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { component: _2.default })
    );
}
//# sourceMappingURL=Root.js.map
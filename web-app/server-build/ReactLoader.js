"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ReactLoader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _server = require("react-dom/server");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _reactPrimitives = require("react-primitives");

var _reactHelmet = require("react-helmet");

var _reactAsyncComponent = require("react-async-component");

var _reactAsyncBootstrapper = require("react-async-bootstrapper");

var _reactAsyncBootstrapper2 = _interopRequireDefault(_reactAsyncBootstrapper);

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootComponentPath = void 0;

if (_config.NODE_ENV === "production") {
    rootComponentPath = "../server-src-build/Root";
} else {
    rootComponentPath = "../src/Root";
}

var Root = require(rootComponentPath).default;
var HTML = _fs2.default.readFileSync(_path2.default.join(__dirname, _config.PUBLIC_DIR, "index.html")).toString();

// todo: add index.html loading
function ReactLoader(req, res, next) {
    var location = req.url.toString();
    var sheet = new _styledComponents.ServerStyleSheet();
    var routerContext = {};
    var asyncContext = (0, _reactAsyncComponent.createAsyncContext)();
    var app = _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: location, context: routerContext },
        _react2.default.createElement(
            _reactAsyncComponent.AsyncComponentProvider,
            { asyncContext: asyncContext },
            _react2.default.createElement(Root, null)
        )
    );
    (0, _reactAsyncBootstrapper2.default)(app).then(function () {
        var html = (0, _server.renderToString)(sheet.collectStyles(app));

        if (routerContext.url) {
            // todo: Add next() call here.
            console.log('-------------------');
            console.warn(routerContext.url);
        }

        var helmet = _reactHelmet.Helmet.renderStatic(); // use renderStatic to prevent memory leak
        var styledComponentCSS = sheet.getStyleTags();
        var reactPrimitiveCSS = _reactPrimitives.StyleSheet.getStyleSheets().map(function (_ref) {
            var id = _ref.id,
                textContent = _ref.textContent;
            return "<style id=" + id + ">" + textContent + "</style>";
        }).join('');
        res.status(200).send(HTML.replace(/<link class="SSR:title"\/>/, helmet.title.toString()).replace(/<link class="SSR:CSS"\/>/, styledComponentCSS + reactPrimitiveCSS).replace(/<link class="SSR:HTML"\/>/, html));
    });
}
//# sourceMappingURL=ReactLoader.js.map
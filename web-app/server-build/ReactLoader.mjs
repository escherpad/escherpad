"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ReactLoader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _reactPrimitives = require("react-primitives");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(process.env.NODE_ENV);

var rootComponentPath = void 0;
if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "production") {
    rootComponentPath = "../build/Root";
} else {
    rootComponentPath = "../src/Root";
}

var Root = require(rootComponentPath).default;
var HTML = _fs2.default.readFileSync(__dirname + '/../public/index.html').toString();

// todo: add index.html loading
function ReactLoader(req, res, next) {
    var location = req.url.toString();

    var sheet = new _styledComponents.ServerStyleSheet();
    var html = (0, _server.renderToString)(sheet.collectStyles(_react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: location, context: {} },
        _react2.default.createElement(Root, null)
    )));
    var styledComponentCSS = sheet.getStyleTags();
    var reactPrimitiveCSS = _reactPrimitives.StyleSheet.getStyleSheets().map(function (_ref) {
        var id = _ref.id,
            textContent = _ref.textContent;
        return "<style id=" + id + ">" + textContent + "</style>";
    }).join('');
    res.status(200).send(HTML.replace(/<!-- SSR:CSS -->/, styledComponentCSS + reactPrimitiveCSS).replace(/<!-- SSR:HTML -->/, html));
}
//# sourceMappingURL=ReactLoader.js.map
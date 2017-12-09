#!/usr/bin/env babel-node
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _ReactLoader = require('./ReactLoader');

var _ReactLoader2 = _interopRequireDefault(_ReactLoader);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _blacklistRouter = require('./blacklistRouter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _morgan2.default)('combined'));

// note: Serve static content except the static index.html.
var rootBlackList = /^\/($|[#?].*$|index\.html[#?]?.*$)/;
var staticHandler = _express2.default.static(_path2.default.join(__dirname, _config.PUBLIC_DIR));
app.use((0, _blacklistRouter.blackListRouter)(rootBlackList, staticHandler));

// note: serve from the react server app
app.use(_ReactLoader2.default);

app.listen(_config.PORT, function () {
    return console.log('App listening on port ' + _config.PORT + '!');
}).on('error', function onError(error) {
    if (error.syscall !== 'listen') throw error;
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    if (error.code === 'EACCES') {
        console.error(bind + ' requires elevated privileges');
    } else if (error.code === 'EADDRINUSE') {
        console.error(bind + ' is already in use');
    }
    throw error;
});
//# sourceMappingURL=index.js.map
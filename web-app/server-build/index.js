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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _morgan2.default)('combined'));
app.use('/', _ReactLoader2.default);

var env = process.env.NODE_ENV || 'dev';
// const PORT = process.env.PORT || (env === "production" ? 80 : 3001);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    return console.log('App listening on port ' + PORT + '!');
});
app.on('error', function onError(error) {
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
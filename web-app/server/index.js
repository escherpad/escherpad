#!/usr/bin/env babel-node
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ReactLoader from "./ReactLoader";
import path from "path";
import {PORT, PUBLIC_DIR} from "./config";
import {blackListRouter} from "./blacklistRouter";

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));

// note: Serve static content except the static index.html.
const rootBlackList = /^\/($|[#?].*$|index\.html[#?]?.*$)/;
const staticHandler = express.static(path.join(__dirname, PUBLIC_DIR));
app.use(blackListRouter(rootBlackList, staticHandler));

// note: serve from the react server app
app.use(ReactLoader);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
    .on('error', function onError(error) {
            if (error.syscall !== 'listen') throw error;
            const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
            if (error.code === 'EACCES') {
                console.error(`${bind} requires elevated privileges`);
            } else if (error.code === 'EADDRINUSE') {
                console.error(`${bind} is already in use`);
            }
            throw error;
        }
    );

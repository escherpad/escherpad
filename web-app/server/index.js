#!/usr/bin/env babel-node
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ReactLoader from "./ReactLoader";

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use('/', ReactLoader);

const env = process.env.NODE_ENV || 'dev';
// const PORT = process.env.PORT || (env === "production" ? 80 : 3001);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
app.on('error', function onError(error) {
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

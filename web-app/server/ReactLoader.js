// @flow
import React from "react";
import path from "path";
import {renderToString} from 'react-dom/server'
import {StaticRouter} from "react-router-dom";
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import fs from 'fs';
import {StyleSheet} from 'react-primitives';
import {Helmet} from 'react-helmet';
import {AsyncComponentProvider, createAsyncContext} from "react-async-component";
import asyncBootstrapper from "react-async-bootstrapper";
import {NODE_ENV, PUBLIC_DIR} from "./config";

let rootComponentPath;
if (NODE_ENV  === "production") {
    rootComponentPath = "../server-src-build/Root";
} else {
    rootComponentPath = "../src/Root";
}

const Root = require(rootComponentPath).default;
const HTML = fs.readFileSync(path.join(__dirname, PUBLIC_DIR, "index.html")).toString();

// todo: add index.html loading
export default function ReactLoader(req, res, next) {
    const location = req.url.toString();
    const sheet = new ServerStyleSheet();
    const routerContext = {};
    const asyncContext = createAsyncContext();
    const app = (
        <StaticRouter location={location} context={routerContext}>
            <AsyncComponentProvider asyncContext={asyncContext}>
                <Root/>
            </AsyncComponentProvider>
        </StaticRouter>);
    asyncBootstrapper(app).then(() => {
        const html = renderToString(sheet.collectStyles(app));

        if (routerContext.url) {
            // todo: Add next() call here.
            console.log('-------------------');
            console.warn(routerContext.url);
        }

        const helmet = Helmet.renderStatic(); // use renderStatic to prevent memory leak
        const styledComponentCSS = sheet.getStyleTags();
        const reactPrimitiveCSS = StyleSheet
            .getStyleSheets()
            .map(({id, textContent}) => `<style id=${id}>${textContent}</style>`)
            .join('');
        res.status(200).send(
            HTML
                .replace(/<link class="SSR:title"\/>/, helmet.title.toString())
                .replace(/<link class="SSR:CSS"\/>/, styledComponentCSS + reactPrimitiveCSS)
                .replace(/<link class="SSR:HTML"\/>/, html)
        );
    });
}

// @flow
import React from "react";
import {renderToString} from 'react-dom/server'
import {StaticRouter} from "react-router-dom";
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import fs from 'fs';
import {StyleSheet} from 'react-primitives';
import {Helmet} from 'react-helmet';

let rootComponentPath;
if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "production") {
    rootComponentPath = "../server-src-build/Root";
} else {
    rootComponentPath = "../src/Root";
}

const Root = require(rootComponentPath).default;
const HTML = fs.readFileSync(__dirname + '/../public/index.html').toString();

// todo: add index.html loading
export default function ReactLoader(req, res, next) {
    const location = req.url.toString();

    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(
        <StaticRouter location={location} context={{}}>
            <Root/>
        </StaticRouter>
    ));
    const helmet = Helmet.renderStatic(); // use renderStatic to prevent memory leak
    const styledComponentCSS = sheet.getStyleTags();
    const reactPrimitiveCSS = StyleSheet
        .getStyleSheets()
        .map(({id, textContent}) => `<style id=${id}>${textContent}</style>`)
        .join('');
    res.status(200).send(
        HTML
            .replace(/<!-- SSR:title -->/, helmet.title.toString())
            .replace(/<!-- SSR:CSS -->/, styledComponentCSS + reactPrimitiveCSS)
            .replace(/<!-- SSR:HTML -->/, html)
    );
}

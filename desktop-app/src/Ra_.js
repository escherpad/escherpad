// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import {Store} from "luna";
import {sagaConnect} from "luna-saga";
export default class Ra_ {
    constructor() {
        // self-binding
        this.reducer = this._reducer.bind(this);

        this._commands = {};
        this._keymap = {};
        this._viewAnchors = {};
        this._views = {};
        this._reducers = {};
        // TODO: what to do when saga is duplicated? How to unsubscribe?
        this._sagas = {};
        this._configs = {};

        this.store$ = new Store(this.reducer);
    }

    /** high-performance composite reducer
     * Composes reduces listed in `this._reducers`.  */
    _reducer(s, a) {
        for (let namespace in this._reducers) {
            let r = this._reducers[namespace];
            if (typeof r === 'function') {
                s = r(s, a)
            } else {
                const new_s = {...s};
                for (let rKey in r) {
                    new_s[rKey] = r[rKey](s[rKey], a);
                }
                s = new_s;
            }
        }
        return s;
    }

    loadModule(m) {
        const {namespace, commands, keymap, reducers, views, viewAnchors, sagas, config} = m;
        /** Model and Controller Code */
        this._reducers[namespace] = reducers;
        this._keymap[namespace] = keymap;
        this._sagas[namespace] = sagas;
        this._commands[namespace] = commands;

        /** View Code */
        // NOTICE: current not using namespace.
        this._viewAnchors = {
            ...this._viewAnchors,
            ...viewAnchors
        };
        // TODO: need to warn when view namespace is over-written.
        this._views = {
            ...(this._views || {}),
            ...views
        };

        /** Config Code */
        this._configs[namespace] = config;
    }

    config(m) {
    }

    connectSagas() {
        for (let namespace in this._sagas) {
            for (let key in this._sagas[namespace]) {
                sagaConnect(this.store$, this._sagas[namespace][key]);
            }
        }
    }

    bootstrap(element) {
        this.connectSagas();

        const Comp = this._views['_bootstrap'];
        if (typeof Comp === "function") {
            ReactDOM.render(<Comp ra={this}/>, element);
        } else {
            console.warn('bootstrap component is undefined');
        }
    }
}


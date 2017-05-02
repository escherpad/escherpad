// @flow
import ReactDOM from 'react-dom';
import {Store} from "luna";
import {sagaConnect} from "luna-saga";
export default class App {
    constructor() {
        // self-binding
        this.reducer = this._reducer.bind(this);

        this._commands = {};
        this._keymap = {};
        this._selectors = {};
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
        const {namespace, commands, keymap, reducer, views, selectors, saga, config} = m;
        this._reducers[namespace] = reducer;
        this._keymap[namespace] = keymap;
        this._sagas[namespace] = saga;
        this._commands[namespace] = commands;
        this._selectors = selectors;
        this._views = views;
        this._configs[namespace] = config;
        for (let i in saga) {
            let s = saga[i];
            sagaConnect(this.store$, s);
        }
    }

    config(m) {
    }

    bootstrap(element) {
        console.log(element);
        const Comp = this._views['_bootstrap'];
        if (typeof Comp == "undefined") {
            console.warn('bootstrap component is undefined')
        } else {
            ReactDOM.render(Comp, element)
        }
    }
}


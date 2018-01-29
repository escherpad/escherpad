//@flow
import {Store} from "luna";
import {sagaConnect, throttle, dispatch, select, SAGA_CONNECT_ACTION} from "luna-saga";
import type {TRichResult, TSimpleResult} from "./types";
import {googleAutoComplete} from "./helpers";

type TSearchStore = {
    query: string,
    autoComplete: {
        selection: number,
        results: Array<TSimpleResult>
    },
    selection: number,
    results: Array<TSimpleResult | TRichResult>
}

const InitState: TSearchStore = {
    query: "",
    autoComplete: {selection: -1, results: []},
    selection: -1,
    results: []
};

type TAction = { type: string };
type TSearchCallbackAction = TAction & { items: Array<TSimpleResult | TRichResult> }

const $SymNameSpace = (namespace) => (key) => `${namespace}_${key}`;
const $ = $SymNameSpace('SEARCH');

const search = function (state: TSearchStore = InitState, action: TSearchCallbackAction) {
    if (action.type === $("INPUT")) {
        return {...state, query: action.query};
    } else if (action.type === $("COMPLETE_CB")) {
        // todo: maintain identity of selected item
        return {...state, autoComplete: {selection: -1, results: action.items}};
    } else if (action.type === $("SEARCH_CB")) {
        return {...state, selection: -1, results: action.items};
    } else {
        return state;
    }
};

export function* Search(): Generator<any, any, any> {
    const newState: any = yield select();
    const {items} = yield googleAutoComplete({text: newState.query});
    yield dispatch({type: $("COMPLETE_CB"), items});
}

// todo: make a throttling process

let now = Date.now();
const asyncFn = (cb?: Function) => {
    console.log('async started', Date.now() - now);
    now = Date.now();
    const p = new Promise((res, rej) => setTimeout(res(10), 10000));
    if (!!cb) p.then(cb);
};

let start = Date.now();
const store$ = new Store(search);
const throttledAction = throttle(asyncFn, $("INPUT"), 300, true);
sagaConnect(store$, throttledAction);

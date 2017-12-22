//@flow
import {Store} from "luna";
import {sagaConnect, call, fork, spawn, take, dispatch, delay, select, SAGA_CONNECT_ACTION} from "luna-saga";
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

const $ = (s) => `SEARCH_${s}`;

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

export function* Search() {
    const newState = yield select();
    const {items} = yield googleAutoComplete({text: newState.query});
    yield dispatch({type: $("COMPLETE_CB"), items});
}

export function* SearchProcess() {
    let proc;
    while (true) try {
        const {state, _} = yield take($("INPUT"));
        proc = yield spawn(Search);
        proc.error$.subscribe((err) => console.warn(err));
        yield call(delay, 300);
        const newState = yield select(/* selector for the search store. */);
        if (newState !== state && !proc.isStopped) {
            proc.complete(); // just terminate that process.
            proc = yield spawn(Search)
        }
    } catch (e) {
        console.error(e)
    }
}

const store$ = new Store(search);
store$.update$.subscribe(({state, action}) => console.log(state, action), (err) => console.warn(err), () => console.log("*** completed ***"));
const proc = sagaConnect(store$, SearchProcess());
proc.error$.subscribe((err) => console.warn(err));

store$.dispatch({type: $("INPUT"), query: "A"});
store$.dispatch({type: $("INPUT"), query: "An"});
store$.dispatch({type: $("INPUT"), query: "And"});
store$.dispatch({type: $("INPUT"), query: "Andr"});

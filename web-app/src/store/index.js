import {reducers, procs} from "./google-scholar";
import {Store} from "luna";
import {sagaConnect} from "luna-saga";

const INITIAL_STATE = {};
const rootReducer = {
    search: reducers.search
};
export const store$ = new Store(rootReducer, INITIAL_STATE);
sagaConnect(store$, procs.suggest());
// sagaConnect(store$, procs.search());

import * as gsearch from "gsearch";
import {CALLBACK, dispatch, take, select, call} from "luna-saga";
import type {IAsyncActions} from "./lib";
import {ActionNamespace} from "./lib";

export const $ = ActionNamespace("GOOGLE_SCHOLAR");

export class creators {
    static $ = $;
    static INPUT: string = $("INPUT");
    static SUGGEST: IAsyncActions = $("SUGGEST", true);
    static SEARCH: IAsyncActions = $("SEARCH", true);

    static input(text: string) {
        return {type: creators.INPUT, text};
    }

    static search(text: any) {
        return {type: creators.SEARCH.start, text};
    }

    // static suggest(text: any) {
    //     return {type: this.SUGGEST.start, text};
    // }

}

type TSearchStore = {
    text: string,
    autoComplete: {
        selection: number,
        results: Array<any>
    },
    selection: number,
    results: Array<any>
}

const InitState: TSearchStore = {
    text: "",
    autoComplete: {selection: -1, results: []},
    selection: -1,
    results: []
};

export class reducers {
    static search(state: TSearchStore = InitState, action: TAction) {
        if (action.type === creators.INPUT) {
            return {...state, query: action.text};
        } else if (action.type === creators.SUGGEST.done) {
            // todo: maintain identity of selected item
            return {...state, autoComplete: {selection: -1, results: action.items}};
        } else if (action.type === creators.SEARCH.done) {
            return {...state, selection: -1, results: action.items};
        } else {
            return state;
        }
    }
}

export class procs {
    static* suggest(): Generator<void, void, any> {
        while (true) try {
            const {action} = yield take(creators.INPUT);
            console.log(action);
            const {text} = yield select("search"); // name space for the store
            yield dispatch({type: creators.SUGGEST.doing});
            const suggestions = yield call(gsearch.suggest(action.text, yield CALLBACK));
            yield dispatch({type: creators.SUGGEST.done, suggestions});
        } catch (e) {
            console.log("suggest process error", e)
        }
    }

    static* search(): Generator<void, void, any> {
        const {action} = take("SEARCH");
        const suggestions = yield call(gsearch.suggest(action.text, yield CALLBACK));
        dispatch({type: "TYPEAHEAD_SUGGUESTIONS", suggestions});
    }
}

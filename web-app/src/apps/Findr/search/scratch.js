import {Store} from "luna"

let reducer = function (state = 0, action) {// default value here would be 0.
    if (action.type === "INC") {
        return state + 1;
    } else {
        return state;
    }
};

let store$ = new Store(reducer);

store$.dispatch({type: "INC"});
store$.subscribe((state) => console.log(state));

const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

import {
    take,
    dispatch
} from 'luna-saga';
// reducer
function search(state, action) {
    if (action.type === UPDATE_SEARCH_QUERY) {
        state.searchQuery = action.query;
    } else {
        return state;
    }
}
// processes
export function* updateFileList() {
    // todo: take seems to naturally throttle. How to buffer is a problem.
    while (true) {
        const action = yield take(UPDATE_SEARCH_QUERY);
        console.log("update file list");
        console.log(action);
        const update = yield dispatch({type: "GITHUB::LIST_FILES"});
        console.log("complete dispatch the github list");
        console.log(update);
    }
}

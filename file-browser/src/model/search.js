const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

import {take} from 'luna-saga';
// reducer
function search(state, action) {
    if (action.type === UPDATE_SEARCH_QUERY) {
        state.searchQuery = action.query;
    } else {
        return state
    }
}
// processes
function* updateFileList() {
    // todo: take seems to naturally throttle. How to buffer is a problem.
    while (true) {
        const action = yield take(UPDATE_SEARCH_QUERY);
        console.log(action);
    }
}



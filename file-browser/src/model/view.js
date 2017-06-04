// types
const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';

const DEFAULT_QUERY = "";
const DEFAULT_VIEW_STATE = {
    searchQuery: DEFAULT_QUERY,
    scrollY: 0,
    tabKey: "yours",
    orderBy: "recent",
};

function viewReducer(state = DEFAULT_VIEW_STATE, action) {
    switch (action.type) {
        case UPDATE_SEARCH_QUERY:
            return {...state, searchQuery: action.value};
        case CLEAR_SEARCH_QUERY:
            return {...state, searchQuery: DEFAULT_QUERY};
        default:
            return state;
    }
}

export default viewReducer;

// @flow
import type {FileObjectT} from "./dataSchema";
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY';

declare type ViewStateT = {
    searchQuery: string,
    hero: string, // the large text in the middle of the view
    heroActive: boolean, // highlights the hero text
    fileList: Array<FileObjectT>,
    scrollY: number,
    tabKey: string,
    orderBy: string,
}

const DEFAULT_QUERY: string = "";
const DEFAULT_VIEW_STATE: ViewStateT = {
    searchQuery: DEFAULT_QUERY,
    hero: "Notes", // the large text in the middle of the view
    heroActive: true, // highlights the hero text
    fileList: [],
    scrollY: 0,
    tabKey: "yours",
    orderBy: "recent",
};

function viewReducer(state: ViewStateT = DEFAULT_VIEW_STATE, action: any): ViewStateT {
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

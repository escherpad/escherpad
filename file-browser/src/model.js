// @flow
import {Store} from 'luna';

const DEFAULT_ACCOUNTS_STATE = {};
function accounts(state = DEFAULT_ACCOUNTS_STATE, action) {
    return state
}

const DEFAULT_FILE_STATE = {};
function files(state = DEFAULT_FILE_STATE, action) {
    return state
}

const rootReducer = {
    accounts,
    files
};

export const store$ = new Store(rootReducer);
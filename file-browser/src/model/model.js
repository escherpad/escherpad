// @flow
import {Store} from 'luna';

// todo: generate fake data so that we can write the view
// todo: setup reducer and sagas to provide scaffold for client-side model.


const DEFAULT_ACCOUNTS_STATE = {};
function accounts(state = DEFAULT_ACCOUNTS_STATE, action) {
    return state
}

const DEFAULT_FILE_STATE = {};
function files(state = DEFAULT_FILE_STATE, action) {
    return state
}


import view from './view';
const rootReducer = {
    view,
    accounts,
    files
};

export const store$ = new Store(rootReducer);

store$.update$.subscribe(({state, action})=>{
    console.log({state, action})
});
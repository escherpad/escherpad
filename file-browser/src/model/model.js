// @flow
import {Store} from 'luna';
import {sagaConnect} from "luna-saga";
import view from './view';
import {dropboxMainProc} from "../services/dropbox";
import {githubMainProc} from "../services/github";
import {updateFileList} from "./search";

// todo: generate fake data so that we can write the view
// todo: setup reducer and sagas to provide scaffold for client-side model.

// hard code this.
const dropbox_client_id = "";
const github_client_id = "";

const DEFAULT_ACCOUNTS_STATE = {
    "dropbox:yangge1987@gmail.com": {
        access_token: "fill in"
    },
    "github:jam-world": {
        access_token: "fill in here"
    }
};

function accounts(state = DEFAULT_ACCOUNTS_STATE, action) {
    return state;
}


const DEFAULT_FILE_STATE = {
    order: [],
    '/diary/20102_first_diary': {content: "I love coding", dataModified: 134345252345},
    '/notes/some_note.md': {content: "base64=4h5lk24h5ljh45l23jh45ljh", dateModified: 24523452345}
};

function files(state = DEFAULT_FILE_STATE, action) {
    // if (action.type == "UPDATE_FILES") {
    //     return {...state, ...action.data};
    // }
    return state;
}

const DEFAULT_FILE_LIST = [
    {full_name: "I love poker", id: "asdfasdfasdfasd"},
    {full_name: "I love poker", id: "asdfasdfasdfasd"},
];

function fileList(state = DEFAULT_FILE_LIST, action) {
    console.log("filelist")
    console.log(action)
    if (action.type == "DISPLAY_FILES") {
        console.log("display files");
        console.log(action);
        return action.data;
    }
    return state;
}


const rootReducer = {
    view,
    accounts,
    files,
    fileList
};

export const store$ = new Store(rootReducer);

store$.update$.subscribe(({state, action}) => {
    console.log({state, action});
});


sagaConnect(store$, dropboxMainProc(), true);
sagaConnect(store$, githubMainProc(), true);
sagaConnect(store$, updateFileList(), true);

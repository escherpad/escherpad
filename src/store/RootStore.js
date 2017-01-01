/** Created by ge on 3/24/16. */
import {Store, combineReducers} from "luna";
import Saga, {sagaConnect} from "luna-saga";

import {notices, noticeProc, createNotification} from "./notices";
import {viewMode} from "./viewMode";
import {session} from "./session";
import {editor} from "./editor";
import {posts, pushPost, pullPostFromService, addAccountToPostProc} from "./posts/posts";
import {postList, onSetCurrentFolder} from "./postList";
import {accounts, getDropboxAccount, dropboxAccountKey} from "./accounts/accounts";
import {demoInitialState} from "./demoInitialState";
import ModalReducer from "../lib/ModalReducer";
import {accountBrowserReducer, onAccountBrowserOpen, accountBrowserListFiles} from "./accountBrowser";

const reducer = combineReducers({
  notices,
  session,
  editor,
  viewMode,
  // bindrs,
  postList,
  posts,
  accounts,
  // view states
  editorDropdown: ModalReducer('editor_dropdown'),
  editorDropdownMinor: ModalReducer('editor_dropdown_minor'),
  postSaveModal: ModalReducer('post_save_modal'),
  accountBrowser: ModalReducer('account_browser', accountBrowserReducer),
  editorConfigModal: ModalReducer('editor_config_modal')
});

const _reducer = function (state, action) {
  "use strict";
  if (action.type == "STORAGE_UPDATE") {
    // we can update the storage selectively, so that some of the view mode state are not propagated across the tabs.
    var {editor, viewMode, postList, ..._storageState} = action.storage;
    // shallow patch is nee hoot, because they updates the references disregarding the value.
    // jsonDiffSync is a better way to figure out the differences and apply the patch.
    return {
      ...state,
      ..._storageState
    };
  } else {
    return reducer(state, action)
  }
};

export const GITTOR_STORE = '@@gittor-store';

import lz from "lz-string";
function getStored() {
  "use strict";
  const store = window.localStorage.getItem(GITTOR_STORE);
  if (!store || !store.match) return;
  else if (store.match('^\{(.*)\}$')) {
    return JSON.parse(store);
  } else {
    return JSON.parse(lz.decompress(store));
  }
}

const cachedStore = getStored();
const initialState = (window.__INITIAL_STATE__ || cachedStore || demoInitialState);

// need to figure out the best way to apply localStorage update on the store.
export const rootStore = new Store(_reducer, initialState);
sagaConnect(rootStore, getDropboxAccount(), true);
sagaConnect(rootStore, onAccountBrowserOpen(), true);
sagaConnect(rootStore, accountBrowserListFiles(), true);
sagaConnect(rootStore, pushPost(), true);
sagaConnect(rootStore, noticeProc(), true);
sagaConnect(rootStore, onSetCurrentFolder(), true);
sagaConnect(rootStore, pullPostFromService(), true);
sagaConnect(rootStore, addAccountToPostProc(), true);

window.onstorage = () => {
  "use strict";
  let storage = getStored();
  if (typeof storage !== "undefined") {
    rootStore.dispatch({type: "STORAGE_UPDATE", storage})
  }
};

// for debug purpose
window.dispatch = rootStore.dispatch.bind(rootStore);

rootStore
  .update$
  // .debounceTime(500)
  .subscribe(({state, action}) => {
    console.log("state is", state, "action is", action);
    if (action.type === "STORAGE_UPDATE") return;
    const serialized = JSON.stringify(state);
    // var compressed = lz.compress(serialized);
    // console.log(`compression size reduction ${serialized.length} => ${compressed.length}`);
    // console.log(serialized);
    window.localStorage.setItem(GITTOR_STORE, serialized);
    return;


    //reminder: this should be removed after all of my devices have been updated. Somehow lots of these local storage feel fragile.
    //update: this worked well. Will try to test out more.
    let posts = state.posts;
    Object.keys(posts).map(k => posts[k]).map(post => {
      "use strict";
      if (post.account) {
        let newPost = {...post, accountKey: dropboxAccountKey(post.account)};
        delete newPost['account'];
        setTimeout(() => {
          rootStore.dispatch({
            type: "OVERWRITE_POST",
            post: newPost
          })
        }, 1000);
      }
    })
  });


/** Created by ge on 3/24/16. */
import {Store, combineReducers} from "luna";
import {Saga} from "luna-saga";

import {viewMode} from "./viewMode";
import {session} from "./session";
import {editor} from "./editor";
import {posts} from "./posts/posts";
import {postList} from "../components/list-view/postList";
import {accounts, getDropboxAccount} from "./accounts/accounts";
import {demoInitialState} from "./demoInitialState";


const reducer = combineReducers({
  session,
  editor,
  viewMode,
  postList,
  posts,
  accounts
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
  try {
    return JSON.parse(lz.decompress(window.localStorage.getItem(GITTOR_STORE)));
  } catch (e) {
  }
}
var cachedStore = getStored();
let initialState = (window.__INITIAL_STATE__ || cachedStore || demoInitialState);

// need to figure out the best way to apply localStorage update on the store.
export const rootStore = new Store(_reducer, initialState);
window.onstorage = ()=> {
  "use strict";
  var storage = getStored();
  if (typeof storage !== "undefined") {
    rootStore.dispatch({type: "STORAGE_UPDATE", storage})
  }
};
rootStore.update$.subscribe(({state, action})=> {
  if (action.type === "STORAGE_UPDATE") return;
  var serialized = JSON.stringify(state);
  var compressed = lz.compress(serialized);
  // console.log(`compression size reduction ${serialized.length} => ${compressed.length}`);
  window.localStorage.setItem(GITTOR_STORE, compressed);
});

var getDropboxAccountProc = new Saga(getDropboxAccount);
rootStore.update$.subscribe(getDropboxAccountProc);
getDropboxAccountProc.thunk$.subscribe(_t=>rootStore.dispatch(_t));
getDropboxAccountProc.action$.subscribe(_a=>rootStore.dispatch(_a));
getDropboxAccountProc.run();

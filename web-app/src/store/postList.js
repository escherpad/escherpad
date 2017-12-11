/** Created by ge on 4/18/16. */
import "regenerator-runtime/runtime";
import {dropboxAccountKey, dropboxDateStringToIntDate} from "./accounts/accounts";
import dapi from "../modules/dropbox";
import {createPost, PULL_POST_FROM_SERVICE} from "./posts/posts";
import {take, dispatch, call} from "luna-saga";
import {select, delay} from "luna-saga";

export const ORDER_POSTS_BY = "ORDER_POSTS_BY";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
export const SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER";

export function postList(state = {orderBy: "modifiedAt", searchQuery: ""}, action) {
  if (action.type === ORDER_POSTS_BY) {
    return {...state, orderBy: action.orderBy};
  } else if (action.type === UPDATE_SEARCH_QUERY) {
    return {...state, searchQuery: action.query};
  } else if (action.type === SET_CURRENT_FOLDER) {
    return {
      ...state,
      /* enforce the clearing of searchQuery. */
      searchQuery: "",
      accountKey: (typeof action.accountKey !== "undefined") ? action.accountKey : state.accountKey,
      //reminder: [Call this `currentFolder`, because it is easier to change by *replace*] should this be called `currentFolder`, or parentFolder?
      currentFolder: (typeof action.folder !== "undefined") ? action.folder : state.folder
    };
  } else {
    return state;
  }
}

// action creator
export function setCurrentFolder(accountKey, folder) {
  "use strict";
  return {
    type: SET_CURRENT_FOLDER,
    accountKey,
    folder
  };
}

let QUERIES = ["*.md", "*.ink", "*.url", "*.txt", "*.doc", "*.pdf"];

function* listFilesByExtension(accessToken, accountKey, extension, parentFolder) {
  dapi.updateAccessToken(accessToken);
  let searchResponse = yield dapi.search(extension, parentFolder, 0, 100, "filename");

  if (searchResponse.matches) {
    for (let ind in searchResponse.matches) {
      const metadata = searchResponse.matches[ind].metadata;
      if (metadata) {
        console.log("metadata is", metadata);
      } else {
        console.warn('metadata is not defined.', searchResponse.matches[ind]);
      }
      const {type, post} = createPost();
      const {id, name: title, path_display: parentFolder} = metadata;
      const modifiedAt = dropboxDateStringToIntDate(metadata.client_modified || metadata.server_modified);
      yield dispatch({
        type,
        post: {
          ...post,
          // done: local post id is inconsistent with dropbox id.
          id,
          title,
          parentFolder: parentFolder.split('/').slice(0, -1).join('/'),
          modifiedAt,
          accountKey: accountKey
        }
      });
    }
  }
}

export function* onSetCurrentFolder() {
  "use strict";
  while (true) {
    let {state, action} = yield take(SET_CURRENT_FOLDER);
    if (!action.accountKey) {
      //notice: accountKey is not defined when at root
      console.info('accountKey is undefined. Do not download folder.');
    } else if (!action.folder) {
      console.warn('reached root folder, do NOT download search result here since there will be too many');
    } else {
      const account = state.accounts[action.accountKey];
      if (!account) {
        console.warn("account not found by key:", action.accountKey);
      } else {
        if (account.service === "dropbox") {
          for (let k in QUERIES) {
            const extension = QUERIES[k];
            yield call(listFilesByExtension, account.accessToken, action.accountKey, extension, action.folder);
          }
        }
      }
    }
  }
}

export function* watchFolder() {
  "use strict";
  while (true) {
    const postList = yield select('postList');
    const accounts = yield select('accounts');
    const editor = yield select('editor');
    let account = accounts[postList.accountKey];
    try {
      let list_response = {};
      try {
        dapi.updateAccessToken(account.accessToken);
        list_response = yield dapi.list(postList.currentFolder, true);
      } catch (e) {
        console.log(e);
      }
      if (list_response.cursor) {
        let res = yield dapi.listFeed(list_response.cursor, 480);
        console.log(res);
        if (res.changes) {
          res = yield dapi.listContinue(list_response.cursor);
          for (let i = 0; i < res.entities.length; i++) {
            yield dispatch({type: "SELECT_POST", postId: res.entities[i].id});
          }
        }
        if (res.backoff) {
          yield call(delay, res.backoff);
        } else {
          yield call(delay, 10000);
        }
      }
    } catch (e) {
      console.warn(e);
      yield call(delay, 10000);
    }
  }
}

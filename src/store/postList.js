/** Created by ge on 4/18/16. */
import {dropboxAccountKey} from "./accounts/accounts";
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
      accountKey: action.accountKey,
      //reminder: [Call this `currentFolder`, because it is easier to change by *replace*] should this be called `currentFolder`, or path?
      currentFolder: action.path
    };
  } else {
    return state;
  }
}

// action creator
export function setFolder(accountKey, path) {
  "use strict";
  console.log('test this', accountKey);
  return {
    type: SET_CURRENT_FOLDER,
    accountKey,
    path
  };
}

import dapi from "../modules/dropbox";
import {createPost} from "./posts/posts";
import {take, dispatch} from "luna-saga";

let QUERY = "*.md";

export function* onSetCurrentFolder() {
  "use strict";
  while (true) {
    let {state, action} = yield take(SET_CURRENT_FOLDER);
    const {path, accountKey} = action;

    if (!accountKey) {
      //notice: accountKey is not defined when at root
    } else if (account.service === "dropbox") {
      const account = state.accounts[accountKey];
      if (!action) {
        console.warn("account not found by key:", accountKey);
      } else {
        dapi.updateAccessToken(account.accessToken);
        let searchResponse = yield dapi.search(QUERY, path, 0, 100, "filename");

        if (searchResponse.matches) {
          for (let ind in searchResponse.matches) {
            let {metadata} = searchResponse.matches[ind];
            let {type, post} = createPost();
            let {id, name: title, path_display: path} = metadata;
            yield dispatch({
              type,
              post: {
                ...post,
                //reminder: local post id is inconsistent with dropbox id.
                id,
                title,
                path: path.split('/').slice(0, -1).join('/'),
                accountKey: accountKey
              }
            });
            yield dispatch({type: "PULL_POST_FROM_SERVICE", path, postId: id})
          }
        }
      }
    }
  }
}

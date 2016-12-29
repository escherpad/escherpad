/** Created by ge on 12/6/16. */
import {take, dispatch, select, call, delay} from "luna-saga";

import dapi from "../modules/dropbox";

export function accountBrowserReducer(state, action) {
  "use strict";
  if (action.type == "ACCOUNT_BROWSER_OPEN") {
    return {
      ...state,
      accountType: action.account.service,
      accountKey: dropboxAccountKey(action),
      accessToken: action.account.accessToken
    };
  } else {
    // only execute on "ACCOUNT_BROWSER"
    let {..._action} = action;
    return {...state, ..._action};
  }
}

export function* onAccountBrowserOpen() {
  "use strict";
  while (true) {
    const {action, state} = yield take('ACCOUNT_BROWSER_OPEN');

    yield dispatch({
      type: "ACCOUNT_BROWSER",
      accountId: action.account.uid,
    });

    yield dispatch({
      type: "ACCOUNT_BROWSER_LIST_FILES",
      account: action.account,
      path: state.accountBrowser.cwd
    })
  }
}

export function* listFiles() {
  "use strict";
  while (true) {
    const {action} = yield take("ACCOUNT_BROWSER_LIST_FILES");
    const {account, path} = action;
    if (account.service === "dropbox") {
      dapi.updateAccessToken(account.accessToken);
      let listResponse = yield dapi.list(path);
      if (listResponse.entries) yield dispatch({
        type: "ACCOUNT_BROWSER",
        cwd: path,
        list: listResponse.entries
      });
    }
  }
}

import {dropboxAccountKey} from "../store/accounts/accounts";
import {accountKeyIsService} from "./accounts/accounts";

export function* pushPost() {
  "use strict";
  let oldPosts = yield select('posts');
  while (true) {
    const {state, action} = yield take("UPDATE_POST");
    const {accounts} = state;
    const {post} = action;
    let _post = state.posts[post.id];
    // console.log(_post);
    if (accountKeyIsService(_post.accountKey, "dropbox")) {
      let accessToken = accounts[dropboxAccountKey(_post.account)].accessToken;
      dapi.updateAccessToken(accessToken);
      try {
        // note: saga is single threaded. If it hangs here, it will not
        // take on more "UPDATE_POST" events.
        let response;
        if (post.title) {
          // todo: use collaboration to make sure the correct version is saved.
          response = yield dapi.move(_post.path + '/' + oldPosts[post.id].title, _post.path + '/' + _post.title, "overwrite", false, false);
          oldPosts[post.id] = {
            ...(oldPosts[post.id] || {}),
            ...post
          };
        } else {
          response = yield dapi.upload(_post.path + '/' + _post.title, _post.source, "overwrite", false, false);
        }
        // console.log(response);
      } catch (e) {
        console.log('exception during upload', e);
      }
    }
    yield call(delay, 500);
  }
}

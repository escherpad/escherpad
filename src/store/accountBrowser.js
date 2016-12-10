/** Created by ge on 12/6/16. */
import {take, dispatch, call, delay} from "luna-saga";

import dapi from "../modules/dropbox";

export function accountBrowserReducer(state, action) {
  "use strict";
  if (action.type == "ACCOUNT_BROWSER_OPEN") {
    return {
      ...state,
      accountType: action.account.service,
      accountId: action.account.uid,
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
    const {action} = yield take('ACCOUNT_BROWSER_OPEN');

    yield dispatch({
      type: "ACCOUNT_BROWSER",
      accountId: action.account.uid,
    });

    yield dispatch({
      type: "ACCOUNT_BROWSER_LIST_FILES",
      account: action.account,
      path: ""
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

import {key} from "../store/accounts/accounts";

export function* pushPost() {
  "use strict";
  while (true) {
    const {state, action} = yield take("UPDATE_POST");
    const {accounts} = state;
    const {post} = action;
    let _post = state.posts[post.id];
    // console.log(_post);
    if (_post.account && _post.account.service == "dropbox") {
      let accessToken = accounts[key(_post.account)].accessToken;
      dapi.updateAccessToken(accessToken);
      try {
        // note: saga is single threaded. If it hangs here, it will not
        // take on more "UPDATE_POST" events.
        let response = yield dapi.upload(_post.path + '/' + _post.title, _post.source, "overwrite", false, false);
        console.log(response);
      } catch (e) {
        console.log('exception during upload', e);
      }
    }
    yield call(delay, 500);
  }
}

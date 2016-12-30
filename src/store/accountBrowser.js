/** Created by ge on 12/6/16. */
import {take, dispatch, select, call, delay} from "luna-saga";

import dapi from "../modules/dropbox";

export function accountBrowserReducer(state, action) {
  "use strict";
  if (action.type == "ACCOUNT_BROWSER_OPEN") {
    return {
      ...state,
      accountKey: action.accountKey
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
    const {state, action} = yield take('ACCOUNT_BROWSER_OPEN');
    yield dispatch({
      type: "LIST_FILES",
      accountKey: action.accountKey,
      path: state.accountBrowser.cwd
    })
  }
}

export function* accountBrowserListFiles() {
  "use strict";
  while (true) {
    const {state, action} = yield take("LIST_FILES");
    const {accountKey, path} = action;
    if (!accountKey) {
      //notice: accountKey is not defined when at root
    } else {
      const account = state.accounts[accountKey];
      if (!account) {
        console.warn("account not found by key:", accountKey);
      } else {
        if (account.service === "dropbox") {
          dapi.updateAccessToken(account.accessToken);
          let listResponse = yield dapi.list(path);
          if (listResponse.entries) yield dispatch({
            type: "ACCOUNT_BROWSER",
            path,
            list: listResponse.entries
          });
        }
      }
    }
  }
}


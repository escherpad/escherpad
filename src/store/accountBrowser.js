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
    yield dispatch(listFiles(state.accountBrowser.currentFolder, action.accountKey));
  }
}

export const LIST_FILES = "LIST_FILES";
export function listFiles(folder, accountKey) {
  "use strict";
  return {
    type: LIST_FILES,
    accountKey,
    folder: folder
  }
}

export function* accountBrowserListFiles() {
  "use strict";
  while (true) {
    const {state, action} = yield take(LIST_FILES);
    const {accountKey, folder} = action;
    if (!accountKey) {
      //notice: accountKey is not defined when at root
    } else {
      const account = state.accounts[accountKey];
      if (!account) {
        console.warn("account not found by key:", accountKey);
      } else {
        if (account.service === "dropbox") {
          dapi.updateAccessToken(account.accessToken);
          let listResponse = yield dapi.list(folder);
          if (listResponse.entries) yield dispatch({
            type: "ACCOUNT_BROWSER",
            currentFolder: folder,
            entries: listResponse.entries
          });
        }
      }
    }
  }
}


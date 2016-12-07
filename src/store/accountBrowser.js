/** Created by ge on 12/6/16. */
import {take, dispatch} from "luna-saga";

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
  } else return state;
}

export default function* onAccountBrowserOpen() {
  "use strict";
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
};

export default function* listFiles() {
  "use strict";
  const {action} = yield take('ACCOUNT_BROWSER_LIST_FILES');
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

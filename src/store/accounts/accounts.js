/** Created by ge on 5/14/16. */
const ALLOWED_SERVICES = ["email", "dropbox"];

export function validateAccount(account) {
  // account is valid if account has the service field, and service is one of the ones listed above.
  // require fields: service, uid.
  return (!!account && account.service && (ALLOWED_SERVICES.indexOf(account.service) > -1) && account.id);
}
export function dropboxAccountKey(account) {
  if (!account) {
    console.warn("account is undefined", account);
    return undefined;
  } else {
    return (account ? account.service + ':' + account.uid : undefined);
  }
}

export function isDropboxId(postId){
  "use strict";
  return (!!postId && postId.match(/^id:/));
}

export function getServiceFromAccountKey(accountKey) {
  "use strict";
  return accountKey ? accountKey.split(':')[0] : undefined;
}

export function accountKeyIsService(accountKey, targetService) {
  "use strict";
  if (typeof targetService !== "undefined") {
    let ind = ALLOWED_SERVICES.indexOf(targetService);
    let service = ALLOWED_SERVICES[ind];
    return getServiceFromAccountKey(accountKey) === service;
  } else {
    return false;
  }
}

export function accounts(state = {}, action) {
  if (action.type === "UPSERT_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    return {
      ...state,
      [dropboxAccountKey(account)]: account
    };
  } else if (action.type === "UPDATE_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let _key = dropboxAccountKey(account);
    if (!state[_key]) return state;
    return {
      ...state,
      [dropboxAccountKey(account)]: {...state[dropboxAccountKey], ...account}
    };
  } else if (action.type === "DELETE_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let newState = {...state};
    delete newState[dropboxAccountKey(account)];
    return newState;
  }
  return state;
}

/* Action Creators */
//backlog: move this to better place
export function addAccountToPost(postId, account, path) {
  "use strict";
  //todo: use MERGE_POST type instead?
  return {
    type: "UPDATE_POST",
    post: {
      id: postId,
      accountKey: dropboxAccountKey(account),
      path
    }
  }
}

import {take, dispatch} from "luna-saga";
import dapi from "../../modules/dropbox";
import "regenerator-runtime/runtime";

export function* getDropboxAccount() {
  "use strict";
  while (true) {
    const {action} = yield take('UPSERT_ACCOUNT');
    const {account} = action;
    if (account.service === "dropbox") {
      let _account = yield dapi.getAccountInfo();
      if (!!_account) yield dispatch({
        type: "UPDATE_ACCOUNT",
        account: {
          ...account, ..._account
        }
      });
    }
  }
}


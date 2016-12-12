/** Created by ge on 5/14/16. */
const ALLOWED_SERVICES = ["email", "dropbox"];

export function validateAccount(account) {
  // account is valid if account has the service field, and service is one of the ones listed above.
  // require fields: service, uid.
  return (!!account && account.service && (ALLOWED_SERVICES.indexOf(account.service) > -1) && account.uid);
}
export function key(account) {
  return (account.service + ':' + account.uid);
}

export function accounts(state = {}, action) {
  if (action.type === "UPSERT_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    return {
      ...state,
      [key(account)]: account
    };
  } else if (action.type === "UPDATE_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let _key = key(account);
    if (!state[_key]) return state;
    return {
      ...state,
      [key(account)]: {...state[key], ...account}
    };
  } else if (action.type === "DELETE_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let newState = {...state};
    delete newState[key(account)];
    return newState;
  }
  return state;
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


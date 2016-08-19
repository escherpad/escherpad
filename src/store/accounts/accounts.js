/** Created by ge on 5/14/16. */
const services = ["email", "dropbox"];

export function validateAccount(account) {
  return (!!account && account.service && (services.indexOf(account.service) > -1) && account.uid);
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
import {getAccountInfo} from "../../services/dropboxApi";
import "regenerator-runtime/runtime";

export function* getDropboxAccount() {
  "use strict";
  const {action} = yield take('UPSERT_ACCOUNT');
  const {account} = action;
  const {service, uid, accessToken} = account;
  if (service === "dropbox") {
    var _account = yield getAccountInfo(accessToken);
    if (!!_account) yield dispatch({
      type: "UPDATE_ACCOUNT",
      account: {
        ...account, ..._account
      }
    });
  }
}

export function* requestDropboxToken() {
  "use strict";
  const {action} = yield take('EYWA_REQUEST_TOKEN');
  const {service} = action;
  if (service === 'dropbox') {
    requestAccessToken()
  } else {
  }

}

/** Created by ge on 5/14/16. */
// import {$uuid} from "./../utils/$uuid";
// const accountInitialState = {
//   type: "dropbox" // "github", "google", "facebook"
// };
//
// export function account(state = accountInitialState, action) {
//   return state;
// }

const services = ["email", "dropbox"];

export function validateAccount(account) {
  "use strict";
  return (!!account && account.service && (services.indexOf(account.service) > -1) && account.uid);
}
export function key(account) {
  "use strict";
  return (account.service + ':' + account.uid);
}

export function accounts(state = {}, action) {
  "use strict";
  if (action.type === "UPSERT_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let newState = {...state};
    newState[key(account)] = account;
    return newState;
  } else if (action.type === "UPDATE_ACCOUNT") {
    let {account} = action;
    if (!validateAccount(account)) return state;
    let _key = key(account);
    if (!state[_key]) return state;
    let newState = {...state};
    newState[key(account)] = {...state[key], ...account};
    return newState;
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
export function* getDropboxAccount() {
  "use strict";
  var {action} = yield take('UPSERT_ACCOUNT');
  var {account} = action;
  var {service, uid, accessToken} = account;
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

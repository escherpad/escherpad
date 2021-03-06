/** Created by ge on 5/14/16. */
import {ADD_ACCOUNT_TO_POST} from "../posts/posts";
import {take, dispatch} from "luna-saga";
import dapi from "../../modules/dropbox";
import "regenerator-runtime/runtime";
import moment from "moment";


const ALLOWED_SERVICES = ["email", "dropbox"];

export function validateAccount(account) {
    // account is valid if account has the service field, and service is one of the ones listed above.
    // require fields: service, uid.
    return (!!account && account.service && (ALLOWED_SERVICES.indexOf(account.service) > -1) && account.uid);
}

export function dropboxAccountKey(account) {
    return (account ? account.service + ':' + account.uid : undefined);
}

export function dropboxDateStringToIntDate(dateString) {
    "use strict";
    if (typeof dateString === "undefined") console.error('variable dateString is not defined');
    return moment(dateString).valueOf();
}

export function unixEpochToDropboxDateString(unixEpoch) {
    "use strict";
    if (typeof unixEpoch === "undefined") throw Error('variable unixEpoch is not defined');
    return moment.utc(unixEpoch).format()
}

export function isDropboxId(postId) {
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
        if (!validateAccount(action.account)) return state;
        return {
            ...state,
            [dropboxAccountKey(action.account)]: action.account
        };
    } else if (action.type === "UPDATE_ACCOUNT") {
        if (!validateAccount(action.account)) return state;
        let _key = dropboxAccountKey(action.account);
        if (!state[_key]) return state;
        return {
            ...state,
            [dropboxAccountKey(action.account)]: {...state[dropboxAccountKey], ...action.account}
        };
    } else if (action.type === "DELETE_ACCOUNT") {
        if (!validateAccount(action.account)) return state;
        let newState = {...state};
        delete newState[dropboxAccountKey(action.account)];
        return newState;
    }
    return state;
}

/* Action Creators */

//backlog: move this to better place
export function addAccountToPost(postId, account, parentFolder) {
    "use strict";
    return {
        type: ADD_ACCOUNT_TO_POST,
        post: {
            id: postId,
            accountKey: dropboxAccountKey(account),
            parentFolder
        }
    }
}

export function* getDropboxAccount() {
    // todo: need to dispatch another action after this.
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


"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 5/14/16. */


exports.validateAccount = validateAccount;
exports.dropboxAccountKey = dropboxAccountKey;
exports.dropboxDateStringToIntDate = dropboxDateStringToIntDate;
exports.unixEpochToDropboxDateString = unixEpochToDropboxDateString;
exports.isDropboxId = isDropboxId;
exports.getServiceFromAccountKey = getServiceFromAccountKey;
exports.accountKeyIsService = accountKeyIsService;
exports.accounts = accounts;
exports.addAccountToPost = addAccountToPost;
exports.getDropboxAccount = getDropboxAccount;

var _posts = require("../posts/posts");

var _lunaSaga = require("luna-saga");

var _dropbox = require("../../modules/dropbox");

var _dropbox2 = _interopRequireDefault(_dropbox);

require("regenerator-runtime/runtime");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getDropboxAccount);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALLOWED_SERVICES = ["email", "dropbox"];

function validateAccount(account) {
    // account is valid if account has the service field, and service is one of the ones listed above.
    // require fields: service, uid.
    return !!account && account.service && ALLOWED_SERVICES.indexOf(account.service) > -1 && account.uid;
}

function dropboxAccountKey(account) {
    return account ? account.service + ':' + account.uid : undefined;
}

function dropboxDateStringToIntDate(dateString) {
    "use strict";

    if (typeof dateString === "undefined") console.error('variable dateString is not defined');
    return (0, _moment2.default)(dateString).valueOf();
}

function unixEpochToDropboxDateString(unixEpoch) {
    "use strict";

    if (typeof unixEpoch === "undefined") throw Error('variable unixEpoch is not defined');
    return _moment2.default.utc(unixEpoch).format();
}

function isDropboxId(postId) {
    "use strict";

    return !!postId && postId.match(/^id:/);
}

function getServiceFromAccountKey(accountKey) {
    "use strict";

    return accountKey ? accountKey.split(':')[0] : undefined;
}

function accountKeyIsService(accountKey, targetService) {
    "use strict";

    if (typeof targetService !== "undefined") {
        var ind = ALLOWED_SERVICES.indexOf(targetService);
        var service = ALLOWED_SERVICES[ind];
        return getServiceFromAccountKey(accountKey) === service;
    } else {
        return false;
    }
}

function accounts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (action.type === "UPSERT_ACCOUNT") {
        if (!validateAccount(action.account)) return state;
        return _extends({}, state, _defineProperty({}, dropboxAccountKey(action.account), action.account));
    } else if (action.type === "UPDATE_ACCOUNT") {
        if (!validateAccount(action.account)) return state;
        var _key = dropboxAccountKey(action.account);
        if (!state[_key]) return state;
        return _extends({}, state, _defineProperty({}, dropboxAccountKey(action.account), _extends({}, state[dropboxAccountKey], action.account)));
    } else if (action.type === "DELETE_ACCOUNT") {
        if (!validateAccount(action.account)) return state;
        var newState = _extends({}, state);
        delete newState[dropboxAccountKey(action.account)];
        return newState;
    }
    return state;
}

/* Action Creators */

//backlog: move this to better place
function addAccountToPost(postId, account, parentFolder) {
    "use strict";

    return {
        type: _posts.ADD_ACCOUNT_TO_POST,
        post: {
            id: postId,
            accountKey: dropboxAccountKey(account),
            parentFolder: parentFolder
        }
    };
}

function getDropboxAccount() {
    // todo: need to dispatch another action after this.
    "use strict";

    var _ref, action, account, _account;

    return regeneratorRuntime.wrap(function getDropboxAccount$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 15;
                        break;
                    }

                    _context.next = 3;
                    return (0, _lunaSaga.take)('UPSERT_ACCOUNT');

                case 3:
                    _ref = _context.sent;
                    action = _ref.action;
                    account = action.account;

                    if (!(account.service === "dropbox")) {
                        _context.next = 13;
                        break;
                    }

                    _context.next = 9;
                    return _dropbox2.default.getAccountInfo();

                case 9:
                    _account = _context.sent;

                    if (!_account) {
                        _context.next = 13;
                        break;
                    }

                    _context.next = 13;
                    return (0, _lunaSaga.dispatch)({
                        type: "UPDATE_ACCOUNT",
                        account: _extends({}, account, _account)
                    });

                case 13:
                    _context.next = 0;
                    break;

                case 15:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked, this);
}
//# sourceMappingURL=accounts.js.map
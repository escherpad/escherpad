"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIST_FILES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 12/6/16. */


exports.accountBrowserReducer = accountBrowserReducer;
exports.onAccountBrowserOpen = onAccountBrowserOpen;
exports.listFiles = listFiles;
exports.accountBrowserListFiles = accountBrowserListFiles;

var _lunaSaga = require("luna-saga");

var _dropbox = require("../modules/dropbox");

var _dropbox2 = _interopRequireDefault(_dropbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(onAccountBrowserOpen),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(accountBrowserListFiles);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function accountBrowserReducer(state, action) {
  "use strict";

  if (action.type == "ACCOUNT_BROWSER_OPEN") {
    return _extends({}, state, {
      accountKey: action.accountKey
    });
  } else {
    // only execute on "ACCOUNT_BROWSER"
    var _action = _objectWithoutProperties(action, []);

    return _extends({}, state, _action);
  }
}

function onAccountBrowserOpen() {
  "use strict";

  var _ref, state, action;

  return regeneratorRuntime.wrap(function onAccountBrowserOpen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 10;
            break;
          }

          _context.next = 3;
          return (0, _lunaSaga.take)('ACCOUNT_BROWSER_OPEN');

        case 3:
          _ref = _context.sent;
          state = _ref.state;
          action = _ref.action;
          _context.next = 8;
          return (0, _lunaSaga.dispatch)(listFiles(state.accountBrowser.currentFolder, action.accountKey));

        case 8:
          _context.next = 0;
          break;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var LIST_FILES = exports.LIST_FILES = "LIST_FILES";
function listFiles(folder, accountKey) {
  "use strict";

  return {
    type: LIST_FILES,
    accountKey: accountKey,
    folder: folder
  };
}

function accountBrowserListFiles() {
  "use strict";

  var _ref2, _state, _action2, accountKey, folder, account, listResponse;

  return regeneratorRuntime.wrap(function accountBrowserListFiles$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 27;
            break;
          }

          _context2.next = 3;
          return (0, _lunaSaga.take)(LIST_FILES);

        case 3:
          _ref2 = _context2.sent;
          _state = _ref2.state;
          _action2 = _ref2.action;
          accountKey = _action2.accountKey, folder = _action2.folder;

          if (accountKey) {
            _context2.next = 10;
            break;
          }

          _context2.next = 25;
          break;

        case 10:
          account = _state.accounts[accountKey];

          if (account) {
            _context2.next = 15;
            break;
          }

          console.warn("account not found by key:", accountKey);
          _context2.next = 25;
          break;

        case 15:
          if (!(account.service === "dropbox")) {
            _context2.next = 25;
            break;
          }

          _dropbox2.default.updateAccessToken(account.accessToken);
          _context2.next = 19;
          return (0, _lunaSaga.dispatch)({
            type: "ACCOUNT_BROWSER",
            currentFolder: folder,
            entries: []
          });

        case 19:
          _context2.next = 21;
          return _dropbox2.default.list(folder);

        case 21:
          listResponse = _context2.sent;

          if (!listResponse.entries) {
            _context2.next = 25;
            break;
          }

          _context2.next = 25;
          return (0, _lunaSaga.dispatch)({
            type: "ACCOUNT_BROWSER",
            currentFolder: folder,
            entries: listResponse.entries
          });

        case 25:
          _context2.next = 0;
          break;

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
//# sourceMappingURL=accountBrowser.js.map
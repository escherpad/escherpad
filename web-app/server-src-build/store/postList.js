"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_CURRENT_FOLDER = exports.UPDATE_SEARCH_QUERY = exports.ORDER_POSTS_BY = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 4/18/16. */


exports.postList = postList;
exports.setCurrentFolder = setCurrentFolder;
exports.onSetCurrentFolder = onSetCurrentFolder;
exports.watchFolder = watchFolder;

require("regenerator-runtime/runtime");

var _accounts = require("./accounts/accounts");

var _dropbox = require("../modules/dropbox");

var _dropbox2 = _interopRequireDefault(_dropbox);

var _posts = require("./posts/posts");

var _lunaSaga = require("luna-saga");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(listFilesByExtension),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(onSetCurrentFolder),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(watchFolder);

var ORDER_POSTS_BY = exports.ORDER_POSTS_BY = "ORDER_POSTS_BY";
var UPDATE_SEARCH_QUERY = exports.UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
var SET_CURRENT_FOLDER = exports.SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER";

function postList() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { orderBy: "modifiedAt", searchQuery: "" };
  var action = arguments[1];

  if (action.type === ORDER_POSTS_BY) {
    return _extends({}, state, { orderBy: action.orderBy });
  } else if (action.type === UPDATE_SEARCH_QUERY) {
    return _extends({}, state, { searchQuery: action.query });
  } else if (action.type === SET_CURRENT_FOLDER) {
    return _extends({}, state, {
      /* enforce the clearing of searchQuery. */
      searchQuery: "",
      accountKey: typeof action.accountKey !== "undefined" ? action.accountKey : state.accountKey,
      //reminder: [Call this `currentFolder`, because it is easier to change by *replace*] should this be called `currentFolder`, or parentFolder?
      currentFolder: typeof action.folder !== "undefined" ? action.folder : state.folder
    });
  } else {
    return state;
  }
}

// action creator
function setCurrentFolder(accountKey, folder) {
  "use strict";

  return {
    type: SET_CURRENT_FOLDER,
    accountKey: accountKey,
    folder: folder
  };
}

var QUERIES = ["*.md", "*.ink", "*.url", "*.txt", "*.doc", "*.pdf"];

function listFilesByExtension(accessToken, accountKey, extension, parentFolder) {
  var searchResponse, ind, metadata, _createPost, type, post, id, title, _parentFolder, modifiedAt;

  return regeneratorRuntime.wrap(function listFilesByExtension$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _dropbox2.default.updateAccessToken(accessToken);
          _context.next = 3;
          return _dropbox2.default.search(extension, parentFolder, 0, 100, "filename");

        case 3:
          searchResponse = _context.sent;

          if (!searchResponse.matches) {
            _context.next = 17;
            break;
          }

          _context.t0 = regeneratorRuntime.keys(searchResponse.matches);

        case 6:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 17;
            break;
          }

          ind = _context.t1.value;
          metadata = searchResponse.matches[ind].metadata;

          if (metadata) {
            console.log("metadata is", metadata);
          } else {
            console.warn('metadata is not defined.', searchResponse.matches[ind]);
          }
          _createPost = (0, _posts.createPost)(), type = _createPost.type, post = _createPost.post;
          id = metadata.id, title = metadata.name, _parentFolder = metadata.path_display;
          modifiedAt = (0, _accounts.dropboxDateStringToIntDate)(metadata.client_modified || metadata.server_modified);
          _context.next = 15;
          return (0, _lunaSaga.dispatch)({
            type: type,
            post: _extends({}, post, {
              // done: local post id is inconsistent with dropbox id.
              id: id,
              title: title,
              parentFolder: _parentFolder.split('/').slice(0, -1).join('/'),
              modifiedAt: modifiedAt,
              accountKey: accountKey
            })
          });

        case 15:
          _context.next = 6;
          break;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function onSetCurrentFolder() {
  "use strict";

  var _ref, state, action, account, k, extension;

  return regeneratorRuntime.wrap(function onSetCurrentFolder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 30;
            break;
          }

          _context2.next = 3;
          return (0, _lunaSaga.take)(SET_CURRENT_FOLDER);

        case 3:
          _ref = _context2.sent;
          state = _ref.state;
          action = _ref.action;

          if (action.accountKey) {
            _context2.next = 10;
            break;
          }

          //notice: accountKey is not defined when at root
          console.info('accountKey is undefined. Do not download folder.');
          _context2.next = 28;
          break;

        case 10:
          if (action.folder) {
            _context2.next = 14;
            break;
          }

          console.warn('reached root folder, do NOT download search result here since there will be too many');
          _context2.next = 28;
          break;

        case 14:
          account = state.accounts[action.accountKey];

          if (account) {
            _context2.next = 19;
            break;
          }

          console.warn("account not found by key:", action.accountKey);
          _context2.next = 28;
          break;

        case 19:
          if (!(account.service === "dropbox")) {
            _context2.next = 28;
            break;
          }

          _context2.t0 = regeneratorRuntime.keys(QUERIES);

        case 21:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 28;
            break;
          }

          k = _context2.t1.value;
          extension = QUERIES[k];
          _context2.next = 26;
          return (0, _lunaSaga.call)(listFilesByExtension, account.accessToken, action.accountKey, extension, action.folder);

        case 26:
          _context2.next = 21;
          break;

        case 28:
          _context2.next = 0;
          break;

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchFolder() {
  "use strict";

  var _postList, accounts, editor, account, list_response, res, i;

  return regeneratorRuntime.wrap(function watchFolder$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!true) {
            _context3.next = 55;
            break;
          }

          _context3.next = 3;
          return (0, _lunaSaga.select)('postList');

        case 3:
          _postList = _context3.sent;
          _context3.next = 6;
          return (0, _lunaSaga.select)('accounts');

        case 6:
          accounts = _context3.sent;
          _context3.next = 9;
          return (0, _lunaSaga.select)('editor');

        case 9:
          editor = _context3.sent;
          account = accounts[_postList.accountKey];
          _context3.prev = 11;
          list_response = {};
          _context3.prev = 13;

          _dropbox2.default.updateAccessToken(account.accessToken);
          _context3.next = 17;
          return _dropbox2.default.list(_postList.currentFolder, true);

        case 17:
          list_response = _context3.sent;
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](13);

          console.log(_context3.t0);

        case 23:
          if (!list_response.cursor) {
            _context3.next = 46;
            break;
          }

          _context3.next = 26;
          return _dropbox2.default.listFeed(list_response.cursor, 480);

        case 26:
          res = _context3.sent;

          console.log(res);

          if (!res.changes) {
            _context3.next = 39;
            break;
          }

          _context3.next = 31;
          return _dropbox2.default.listContinue(list_response.cursor);

        case 31:
          res = _context3.sent;
          i = 0;

        case 33:
          if (!(i < res.entities.length)) {
            _context3.next = 39;
            break;
          }

          _context3.next = 36;
          return (0, _lunaSaga.dispatch)({ type: "SELECT_POST", postId: res.entities[i].id });

        case 36:
          i++;
          _context3.next = 33;
          break;

        case 39:
          if (!res.backoff) {
            _context3.next = 44;
            break;
          }

          _context3.next = 42;
          return (0, _lunaSaga.call)(_lunaSaga.delay, res.backoff);

        case 42:
          _context3.next = 46;
          break;

        case 44:
          _context3.next = 46;
          return (0, _lunaSaga.call)(_lunaSaga.delay, 10000);

        case 46:
          _context3.next = 53;
          break;

        case 48:
          _context3.prev = 48;
          _context3.t1 = _context3["catch"](11);

          console.warn(_context3.t1);
          _context3.next = 53;
          return (0, _lunaSaga.call)(_lunaSaga.delay, 10000);

        case 53:
          _context3.next = 0;
          break;

        case 55:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[11, 48], [13, 20]]);
}
//# sourceMappingURL=postList.js.map
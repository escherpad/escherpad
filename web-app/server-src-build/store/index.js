"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rootStore = exports.GITTOR_STORE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _luna = require("luna");

var _lunaSaga = require("luna-saga");

var _notices = require("./notices");

var _viewMode2 = require("./viewMode");

var _session = require("./session");

var _editor2 = require("./editor");

var _posts = require("./posts/posts");

var _postList2 = require("./postList");

var _accounts = require("./accounts/accounts");

var _demoInitialState = require("./demoInitialState");

var _ModalReducer = require("../lib/ModalReducer");

var _ModalReducer2 = _interopRequireDefault(_ModalReducer);

var _accountBrowser = require("./accountBrowser");

var _lzString = require("lz-string");

var _lzString2 = _interopRequireDefault(_lzString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** Created by ge on 3/24/16. */


var reducer = (0, _luna.combineReducers)({
    notices: _notices.notices,
    session: _session.session,
    editor: _editor2.editor,
    viewMode: _viewMode2.viewMode,
    // bindrs,
    postList: _postList2.postList,
    posts: _posts.posts,
    accounts: _accounts.accounts,
    // view states
    editorDropdown: (0, _ModalReducer2.default)('editor_dropdown'),
    editorDropdownMinor: (0, _ModalReducer2.default)('editor_dropdown_minor'),
    postSaveModal: (0, _ModalReducer2.default)('post_save_modal'),
    accountBrowser: (0, _ModalReducer2.default)('account_browser', _accountBrowser.accountBrowserReducer),
    editorConfigModal: (0, _ModalReducer2.default)('editor_config_modal')
});

var _reducer = function _reducer(state, action) {
    if (action.type === "STORAGE_UPDATE") {
        // we can update the storage selectively, so that some of the view mode state are not propagated across the tabs.
        var _action$storage = action.storage,
            _editor = _action$storage.editor,
            _viewMode = _action$storage.viewMode,
            _postList = _action$storage.postList,
            _storageState = _objectWithoutProperties(_action$storage, ["editor", "viewMode", "postList"]);
        // shallow patch is nee hoot, because they updates the references disregarding the value.
        // jsonDiffSync is a better way to figure out the differences and apply the patch.


        return _extends({}, state, _storageState);
    } else {
        return reducer(state, action);
    }
};

var GITTOR_STORE = exports.GITTOR_STORE = '@@gittor-store';

function getStored() {
    "use strict";

    var store = window.localStorage.getItem(GITTOR_STORE);
    if (!store || !store.match) return;else if (store.match('^{(.*)}$')) {
        return JSON.parse(store);
    } else {
        return JSON.parse(_lzString2.default.decompress(store));
    }
}

var cachedStore = getStored();
var initialState = window.__INITIAL_STATE__ || cachedStore || _demoInitialState.demoInitialState;

// need to figure out the best way to apply localStorage update on the store.
var rootStore = exports.rootStore = new _luna.Store(_reducer, initialState);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _accounts.getDropboxAccount)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _accountBrowser.onAccountBrowserOpen)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _accountBrowser.accountBrowserListFiles)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _posts.pushPost)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _notices.noticeProc)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _postList2.onSetCurrentFolder)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _posts.pullPostFromService)(), true);
(0, _lunaSaga.sagaConnect)(rootStore, (0, _posts.addAccountToPostProc)(), true);
// sagaConnect(rootStore, watchFolder(), true);

window.onstorage = function () {
    "use strict";

    var storage = getStored();
    if (typeof storage !== "undefined") {
        rootStore.dispatch({ type: "STORAGE_UPDATE", storage: storage });
    }
};

// for debug purpose
window.dispatch = rootStore.dispatch.bind(rootStore);

rootStore.update$
// .debounceTime(500)
.subscribe(function (_ref) {
    var state = _ref.state,
        action = _ref.action;

    if (action.type === "STORAGE_UPDATE") return;
    console.log("state is", state, "action is", action);
    var serialized = JSON.stringify(state);
    console.log("stringification has succeeded");
    // var compressed = lz.compress(serialized);
    // console.log(`compression size reduction ${serialized.length} => ${compressed.length}`);
    // console.log(serialized);
    try {
        window.localStorage.setItem(GITTOR_STORE, serialized);
        console.log('state is precipitated to localStorage');
    } catch (e) {
        console.warn(e);
    }
});

//reminder: this should be removed after all of my devices have been updated. Somehow lots of these local storage feel fragile.
//update: this worked well. Will try to test out more.
var postCollection = rootStore.getValue().posts;
// Object.keys(postCollection).map(k => postCollection[k]).map(upgradeInkFile);

/* upgrade functions */
function upgradeDropboxAccount(post) {
    "use strict";

    if (post.account) {
        var newPost = _extends({}, post, { accountKey: (0, _accounts.dropboxAccountKey)(post.account) });
        delete newPost['account'];
        setTimeout(function () {
            rootStore.dispatch({
                type: "OVERWRITE_POST",
                post: newPost
            });
        }, 1000);
    }
}

function upgradeInkFile(post) {
    "use strict";

    if (!post.title.match(/\.ink$/i) || post.source && post.source.length > 0 && !post.source[0].config) return;
    var newSource = [post.source];
    var newPost = _extends({}, post, { source: newSource });
    setTimeout(function () {
        console.log('upgrading post');
        console.log(post);
        rootStore.dispatch({
            type: "OVERWRITE_POST",
            post: newPost,
            presence: {}
        });
    }, 1000);
}
//# sourceMappingURL=index.js.map
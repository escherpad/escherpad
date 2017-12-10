"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PULL_POST_FROM_SERVICE = exports.PUSH_POST_TO_SERVICE = exports.ADD_ACCOUNT_TO_POST = exports.$NO_PUST_TO_SERVICE = exports.OVERWRITE_POST = exports.DELETE_POST = exports.UPDATE_POST_PRESENCE = exports.UPDATE_POST = exports.ADD_POST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 4/7/16. */


exports.presence = presence;
exports.post = post;
exports.posts = posts;
exports.createPost = createPost;
exports.addAccountToPostProc = addAccountToPostProc;
exports.fileIsBlackListed = fileIsBlackListed;
exports.fileIsWhiteListedForUpload = fileIsWhiteListedForUpload;
exports.extensionSupportPreview = extensionSupportPreview;
exports.dehydrateForUpload = dehydrateForUpload;
exports.hydrateAfterDownload = hydrateAfterDownload;
exports.pushPost = pushPost;
exports.pullPostFromService = pullPostFromService;

var _$uuid = require("../../lib/$uuid");

var _accounts2 = require("../accounts/accounts");

var _lunaSaga = require("luna-saga");

var _dropbox = require("../../modules/dropbox");

var _dropbox2 = _interopRequireDefault(_dropbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(addAccountToPostProc),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(pushPost),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(pullPostFromService);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ADD_POST = exports.ADD_POST = "ADD_POST";
var UPDATE_POST = exports.UPDATE_POST = "UPDATE_POST";
var UPDATE_POST_PRESENCE = exports.UPDATE_POST_PRESENCE = "UPDATE_POST_PRESENCE";
var DELETE_POST = exports.DELETE_POST = "DELETE_POST";
// export const MERGE_POST = "MERGE_POST";
var OVERWRITE_POST = exports.OVERWRITE_POST = "OVERWRITE_POST";

function presence() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (action.post && action.post.presence) return _extends({}, state, action.post.presence);else return state;
}

function post() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (!action.type) {
        return state;
    } else if (action.type === ADD_POST) {
        var _post2 = action.post;
        if (!_post2 || !_post2.id) return;
        return _extends({ _v: 0, _v0: 0 }, action.post);
    } else if (action.type === UPDATE_POST) {
        if (state.id !== action.post.id) return state;

        var _action$post = action.post,
            $updatedId = _action$post.$updatedId,
            _v = _action$post._v,
            _post = _objectWithoutProperties(_action$post, ["$updatedId", "_v"]);

        var newPost = _extends({}, state, _post, {
            presence: presence(state.presence, action),
            _v: typeof _v == 'undefined' ? state._v + 1 : _v //note: allow the editor to override this.
        });
        if ($updatedId) newPost.id = $updatedId;
        return newPost;
    } else if (action.type === OVERWRITE_POST) {
        if (state.id !== action.post.id) return state;

        var _action$post2 = action.post,
            _$updatedId = _action$post2.$updatedId,
            _v2 = _action$post2._v,
            _post3 = _objectWithoutProperties(_action$post2, ["$updatedId", "_v"]);

        var _newPost = _extends({}, _post3, {
            presence: presence(state.presence, action),
            _v: typeof _v2 == 'undefined' ? state._v + 1 : _v2
        });
        return _newPost;
    } else if (action.type === UPDATE_POST_PRESENCE) {
        // does not update the version number
        if (state.id !== action.post.id) return state;
        return _extends({}, state, { presence: presence(state.presence, action)
        });
    } else {
        return state;
    }
}

function posts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (!action.type) return state;
    if (action.type === ADD_POST) {
        var newPost = post(undefined, action);
        if (!newPost) return state;else {
            var newState = _extends({}, state);
            newState[newPost.id] = newPost;
            return newState;
        }
    } else if ([UPDATE_POST, UPDATE_POST_PRESENCE, OVERWRITE_POST].indexOf(action.type) > -1) {
        //done: update the key of post in posts collection when file id has changed.
        var thisPost = state[action.post.id];
        if (!thisPost) return state;
        var updatedPost = post(thisPost, action);
        if (updatedPost == thisPost) return state;
        var _newState = _extends({}, state, _defineProperty({}, action.post.$updatedId || updatedPost.id, updatedPost));
        if (action.post.$updatedId) delete _newState[action.post.id];
        return _newState;
    } else if (action.type === DELETE_POST) {
        var _thisPost = state[action.id];
        if (!_thisPost) return state;
        var _newState2 = _extends({}, state);
        delete _newState2[action.id];
        return _newState2;
    } else {
        return state;
    }
}

function createPost(mimeType, accountKey, parentFolder) {
    var action = {
        type: ADD_POST,
        post: {
            id: (0, _$uuid.$uuid)(),
            createdAt: Date.now(),
            modifiedAt: Date.now()
        }
    };
    if (mimeType) action.post.mimeType = mimeType;
    if (accountKey && typeof parentFolder !== "undefined") {
        action.post.accountKey = accountKey;
        action.post.parentFolder = parentFolder;
    }
    return action;
}

var $NO_PUST_TO_SERVICE = exports.$NO_PUST_TO_SERVICE = "$NO_PUSH_TO_SERVICE";
var ADD_ACCOUNT_TO_POST = exports.ADD_ACCOUNT_TO_POST = "ADD_ACCOUNT_TO_POST";

function addAccountToPostProc() {
    "use strict";

    var _ref, state, action;

    return regeneratorRuntime.wrap(function addAccountToPostProc$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 10;
                        break;
                    }

                    _context.next = 3;
                    return (0, _lunaSaga.take)(ADD_ACCOUNT_TO_POST);

                case 3:
                    _ref = _context.sent;
                    state = _ref.state;
                    action = _ref.action;
                    _context.next = 8;
                    return (0, _lunaSaga.dispatch)({ type: UPDATE_POST, post: action.post });

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

function fileIsBlackListed() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return title.match(/\.(docx?|png|pdf)$/i);
}

function fileIsWhiteListedForUpload() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    //todo: add url to this list *after* adding editor view with built-in iframe preview.
    return title.match(/\.(md|txt|ink)$/);
}

function extensionSupportPreview() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return title.match(/\.(docx?)$/);
}

function dehydrateForUpload(source) {
    "use strict";

    if (typeof source === "string") {
        return source;
    } else {
        return JSON.stringify(source);
    }
}

function hydrateAfterDownload(source) {
    "use strict";

    try {
        return JSON.parse(source);
    } catch (e) {
        return source;
    }
}

//done: move `postPost` to proper place
//resolved: can NOT push (upload) post by post.id. Post.id are only used in pulling.
var PUSH_POST_TO_SERVICE = exports.PUSH_POST_TO_SERVICE = "PUSH_POST_TO_SERVICE";

function pushPost() {
    "use strict";

    var oldPosts, _ref2, _state, _action, accounts, postFromState, account, accessToken, _dispatch, metadata, oldPost;

    return regeneratorRuntime.wrap(function pushPost$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _lunaSaga.select)('posts');

                case 2:
                    oldPosts = _context2.sent;

                case 3:
                    if (!true) {
                        _context2.next = 53;
                        break;
                    }

                    _context2.next = 6;
                    return (0, _lunaSaga.take)(UPDATE_POST);

                case 6:
                    _ref2 = _context2.sent;
                    _state = _ref2.state;
                    _action = _ref2.action;
                    accounts = _state.accounts;
                    postFromState = _state.posts[_action.post.id];

                    if (!(_action[$NO_PUST_TO_SERVICE] || fileIsBlackListed(_action.post.title || postFromState.title))) {
                        _context2.next = 15;
                        break;
                    }

                    console.warn("file update has been prevented");
                    _context2.next = 49;
                    break;

                case 15:
                    if (!fileIsWhiteListedForUpload(_action.post.title || postFromState.title)) {
                        _context2.next = 49;
                        break;
                    }

                    account = _state.accounts[postFromState.accountKey];

                    if (!(0, _accounts2.accountKeyIsService)(postFromState.accountKey, "dropbox")) {
                        _context2.next = 49;
                        break;
                    }

                    accessToken = account.accessToken;

                    _dropbox2.default.updateAccessToken(accessToken);
                    _context2.prev = 20;

                    // note: saga is single threaded. If it hangs here, it will not
                    // take on more "UPDATE_POST" events.
                    metadata = void 0;
                    oldPost = oldPosts[_action.post.id];
                    // note: it is really important that this take happens **right** before the async request, to save snapshot.
                    // todo: need error handling in case upload/move fails.
                    // todo: add progress bar to editor.

                    _context2.next = 25;
                    return (0, _lunaSaga.select)('posts');

                case 25:
                    oldPosts = _context2.sent;

                    if (oldPost) {
                        _context2.next = 32;
                        break;
                    }

                    _context2.next = 29;
                    return _dropbox2.default.upload(postFromState.parentFolder + '/' + postFromState.title, dehydrateForUpload(postFromState.source), "overwrite", false, false, (0, _accounts2.unixEpochToDropboxDateString)(postFromState.modifiedAt));

                case 29:
                    metadata = _context2.sent;
                    _context2.next = 41;
                    break;

                case 32:
                    if (!(_action.post.title && oldPost.title !== postFromState.title)) {
                        _context2.next = 36;
                        break;
                    }

                    _context2.next = 35;
                    return _dropbox2.default.move(oldPost.parentFolder + '/' + oldPost.title, postFromState.parentFolder + '/' + postFromState.title, "overwrite", false, false);

                case 35:
                    metadata = _context2.sent;

                case 36:
                    if (!(typeof _action.post.source !== "undefined" && _action.post.source !== oldPost.source || typeof oldPost.accountKey === "undefined" && typeof _action.post.accountKey === "defined")) {
                        _context2.next = 41;
                        break;
                    }

                    console.log('=====> Now upload');
                    _context2.next = 40;
                    return _dropbox2.default.upload(postFromState.parentFolder + "/" + postFromState.title, dehydrateForUpload(postFromState.source), "overwrite", false, false, (0, _accounts2.unixEpochToDropboxDateString)(postFromState.modifiedAt));

                case 40:
                    metadata = _context2.sent;

                case 41:
                    if (!(metadata && metadata.id !== _action.post.id)) {
                        _context2.next = 44;
                        break;
                    }

                    _context2.next = 44;
                    return (0, _lunaSaga.dispatch)((_dispatch = {
                        type: UPDATE_POST
                    }, _defineProperty(_dispatch, $NO_PUST_TO_SERVICE, true), _defineProperty(_dispatch, "post", {
                        id: _action.post.id,
                        $updatedId: metadata.id
                    }), _dispatch));

                case 44:
                    _context2.next = 49;
                    break;

                case 46:
                    _context2.prev = 46;
                    _context2.t0 = _context2["catch"](20);

                    console.warn('exception during upload', _context2.t0);

                case 49:
                    _context2.next = 51;
                    return (0, _lunaSaga.call)(_lunaSaga.delay, 500);

                case 51:
                    _context2.next = 3;
                    break;

                case 53:
                case "end":
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[20, 46]]);
}

var PULL_POST_FROM_SERVICE = exports.PULL_POST_FROM_SERVICE = "PULL_POST_FROM_SERVICE";

function pullPostFromService() {
    "use strict";
    //feature: pull posts with differential synchronization

    var _ref3, _state2, _action2, _accounts, postId, _post, account, accessToken, _newAction, response, newAction, _newAction3, _response, metadata, id, title, parentFolder, _newAction2;

    return regeneratorRuntime.wrap(function pullPostFromService$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    if (!true) {
                        _context3.next = 64;
                        break;
                    }

                    _context3.next = 3;
                    return (0, _lunaSaga.take)([PULL_POST_FROM_SERVICE, "SELECT_POST"]);

                case 3:
                    _ref3 = _context3.sent;
                    _state2 = _ref3.state;
                    _action2 = _ref3.action;
                    _accounts = _state2.accounts;
                    postId = _action2.postId;
                    _post = _state2.posts[postId];
                    account = _state2.accounts[_post.accountKey];

                    if (!(!account || !_post.accountKey || !(0, _accounts2.isDropboxId)(postId))) {
                        _context3.next = 14;
                        break;
                    }

                    console.warn('post does not have accountKey or postId is not dropbox form. This might be occur ' + 'because the post has not been uploaded to dropbox yet.');
                    _context3.next = 60;
                    break;

                case 14:
                    accessToken = account.accessToken;

                    if (!fileIsBlackListed(_post.title)) {
                        _context3.next = 42;
                        break;
                    }

                    if (!(0, _accounts2.accountKeyIsService)(_post.accountKey, "dropbox")) {
                        _context3.next = 40;
                        break;
                    }

                    _dropbox2.default.updateAccessToken(accessToken);
                    _context3.prev = 18;
                    response = void 0;

                    if (!extensionSupportPreview(_post.title)) {
                        _context3.next = 26;
                        break;
                    }

                    _context3.next = 23;
                    return _dropbox2.default.getPreview(_post.id || _post.parentFolder + "/" + _post.title);

                case 23:
                    response = _context3.sent;
                    _context3.next = 31;
                    break;

                case 26:
                    _context3.next = 28;
                    return _dropbox2.default.downloadBlob(_post.id || _post.parentFolder + "/" + _post.title);

                case 28:
                    response = _context3.sent;

                    response.blob = new Blob([response.blob], { type: "application/pdf" });
                    console.log(response.blob);

                case 31:
                    newAction = (_newAction = {
                        type: UPDATE_POST
                    }, _defineProperty(_newAction, $NO_PUST_TO_SERVICE, true), _defineProperty(_newAction, "post", {
                        id: postId,
                        previewURL: URL.createObjectURL(response.blob) //note: this is a PDF string.
                    }), _newAction);

                    if (response.metadata && response.metadata.id !== postId) newAction.post.$updatedId = response.metadata.id;
                    _context3.next = 35;
                    return (0, _lunaSaga.dispatch)(newAction);

                case 35:
                    _context3.next = 40;
                    break;

                case 37:
                    _context3.prev = 37;
                    _context3.t0 = _context3["catch"](18);

                    console.warn("download preview failed", _context3.t0);

                case 40:
                    _context3.next = 60;
                    break;

                case 42:
                    if (!(0, _accounts2.accountKeyIsService)(_post.accountKey, "dropbox")) {
                        _context3.next = 60;
                        break;
                    }

                    _dropbox2.default.updateAccessToken(accessToken);
                    _context3.prev = 44;
                    _context3.next = 47;
                    return _dropbox2.default.download((0, _accounts2.isDropboxId)(postId) ? postId : _post.parentFolder + '/' + _post.title);

                case 47:
                    _response = _context3.sent;
                    metadata = _response.metadata;

                    console.log("pulling request: metadata is:", metadata);
                    id = metadata.id, title = metadata.name, parentFolder = metadata.path_display;
                    _newAction2 = (_newAction3 = {
                        type: UPDATE_POST
                    }, _defineProperty(_newAction3, $NO_PUST_TO_SERVICE, true), _defineProperty(_newAction3, "post", {
                        id: postId,
                        title: title,
                        parentFolder: parentFolder.split('/').slice(0, -1).join('/'),
                        source: hydrateAfterDownload(_response.content)
                    }), _newAction3);

                    if (_response.metadata.id !== postId) _newAction2.post.$updatedId = _response.metadata.id;
                    _context3.next = 55;
                    return (0, _lunaSaga.dispatch)(_newAction2);

                case 55:
                    _context3.next = 60;
                    break;

                case 57:
                    _context3.prev = 57;
                    _context3.t1 = _context3["catch"](44);

                    console.warn('exception during pulling', _context3.t1);

                case 60:
                    _context3.next = 62;
                    return (0, _lunaSaga.call)(_lunaSaga.delay, 500);

                case 62:
                    _context3.next = 0;
                    break;

                case 64:
                case "end":
                    return _context3.stop();
            }
        }
    }, _marked3, this, [[18, 37], [44, 57]]);
}
//# sourceMappingURL=posts.js.map
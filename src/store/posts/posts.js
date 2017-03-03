/** Created by ge on 4/7/16. */
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_PRESENCE = "UPDATE_POST_PRESENCE";
export const DELETE_POST = "DELETE_POST";
// export const MERGE_POST = "MERGE_POST";
export const OVERWRITE_POST = "OVERWRITE_POST";

export function presence(state = {}, action) {
  if (action.post && action.post.presence) return {...state, ...action.post.presence};
  else return state;
}

export function post(state = {}, action) {
  if (!action.type) {
    return state;
  } else if (action.type === ADD_POST) {
    let post = action.post;
    if (!post || !post.id) return;
    return {_v: 0, _v0: 0, ...action.post}
  } else if (action.type === UPDATE_POST) {
    if (state.id !== action.post.id) return state;
    const {$updatedId, _v, ..._post} = action.post;
    let newPost = {
      ...state,
      ..._post,
      presence: presence(state.presence, action),
      _v: typeof _v == 'undefined' ? (state._v + 1) : _v //note: allow the editor to override this.
    };
    if ($updatedId) newPost.id = $updatedId;
    return newPost
  } else if (action.type === OVERWRITE_POST) {
    if (state.id !== action.post.id) return state;
    const {$updatedId, _v, ..._post} = action.post;
    let newPost = {
      ..._post,
      presence: presence(state.presence, action),
      _v: typeof _v == 'undefined' ? (state._v + 1) : _v
    };
    return newPost;
  } else if (action.type === UPDATE_POST_PRESENCE) { // does not update the version number
    if (state.id !== action.post.id) return state;
    return {
      ... state, presence: presence(state.presence, action)
    }
  } else {
    return state;
  }
}

export function posts(state = {}, action) {
  if (!action.type) return state;
  if (action.type === ADD_POST) {
    let newPost = post(undefined, action);
    if (!newPost) return state;
    else {
      let newState = {...state};
      newState[newPost.id] = newPost;
      return newState;
    }
  } else if ([UPDATE_POST, UPDATE_POST_PRESENCE, OVERWRITE_POST].indexOf(action.type) > -1) {
    //done: update the key of post in posts collection when file id has changed.
    const thisPost = state[action.post.id];
    if (!thisPost) return state;
    let updatedPost = post(thisPost, action);
    if (updatedPost == thisPost) return state;
    let newState = {
      ...state,
      [action.post.$updatedId || updatedPost.id]: updatedPost
    };
    if (action.post.$updatedId) delete newState[action.post.id];
    return newState;
  } else if (action.type === DELETE_POST) {
    const thisPost = state[action.id];
    if (!thisPost) return state;
    let newState = {...state};
    delete newState[action.id];
    return newState;
  } else {
    return state;
  }
}

import {$uuid} from  '../../lib/$uuid';
export function createPost(mimeType, accountKey, parentFolder) {
  let action = {
    type: ADD_POST,
    post: {
      id: $uuid(),
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
  };
  if (mimeType) action.post.mimeType = mimeType;
  if (accountKey && typeof parentFolder !== "undefined") {
    action.post.accountKey = accountKey;
    action.post.parentFolder = parentFolder;
  }
  return action;
}

import {accountKeyIsService, isDropboxId, unixEpochToDropboxDateString} from "../accounts/accounts";
import {select, take, delay, call, dispatch} from "luna-saga";

export const $NO_PUST_TO_SERVICE = "$NO_PUSH_TO_SERVICE";
export const ADD_ACCOUNT_TO_POST = "ADD_ACCOUNT_TO_POST";
export function* addAccountToPostProc() {
  "use strict";
  while (true) {
    const {state, action} = yield take(ADD_ACCOUNT_TO_POST);
    yield dispatch({type: UPDATE_POST, post: action.post});
  }
}

function fileIsBlackListed(title = "") {
  return (title.match(/\.(docx?|png)$/));
}

function fileIsWhiteListedForUpload(title = "") {
  //todo: add url to this list *after* adding editor view with built-in iframe preview.
  return (title.match(/\.(md|txt|ink)$/));
}

function extensionSupportPreview(title = "") {
  return (title.match(/\.(docx?)$/));
}

function dehydrateForUpload(source) {
  "use strict";
  if (typeof source === "string") {
    return source
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

import dapi from "../../modules/dropbox";
//done: move `postPost` to proper place
//resolved: can NOT push (upload) post by post.id. Post.id are only used in pulling.
export const PUSH_POST_TO_SERVICE = "PUSH_POST_TO_SERVICE";
export function* pushPost() {
  "use strict";
  let oldPosts = yield select('posts');
  while (true) {
    //todo: use MERGE_POST type instead?
    //reminder: race condition when switching between different posts, updates gets ignored.
    const {state, action} = yield take(UPDATE_POST);
    const {accounts} = state;
    let postFromState = state.posts[action.post.id];
    if (action[$NO_PUST_TO_SERVICE] || fileIsBlackListed(action.post.title || postFromState.title)) {
      console.warn("file update has been prevented");
    } else if (fileIsWhiteListedForUpload(action.post.title || postFromState.title)) {
      let account = state.accounts[postFromState.accountKey];
      if (accountKeyIsService(postFromState.accountKey, "dropbox")) {
        let accessToken = account.accessToken;
        dapi.updateAccessToken(accessToken);
        try {
          // note: saga is single threaded. If it hangs here, it will not
          // take on more "UPDATE_POST" events.
          let metadata;
          let oldPost = oldPosts[action.post.id];
          // note: it is really important that this take happens **right** before the async request, to save snapshot.
          // todo: need error handling in case upload/move fails.
          // todo: add progress bar to editor.
          oldPosts = yield select('posts');
          if (!oldPost) {
            metadata = yield dapi.upload(postFromState.parentFolder + '/' + postFromState.title, dehydrateForUpload(postFromState.source), "overwrite", false, false, unixEpochToDropboxDateString(postFromState.modifiedAt));
          } else {
            //fixed: somehow, exception thrown here from the api call promise is 1. not properly caught. 2. stops further
            //done: use id:<file_id> as the parentFolder, make sure `post.id` is dropbox id.
            //backlog: use collaboration to make sure the correct version is saved.
            //notice: we assume that only one of the title and the content are changed.
            if (action.post.title && oldPost.title !== postFromState.title) {
              metadata = yield dapi.move(
                oldPost.parentFolder + '/' + oldPost.title,
                postFromState.parentFolder + '/' + postFromState.title, "overwrite", false, false);
            }
            if (
              (typeof action.post.source !== "undefined" && action.post.source !== oldPost.source) ||
              (typeof oldPost.accountKey === "undefined" && typeof action.post.accountKey === "defined")
            ) {
              console.log('=====> Now upload');
              metadata = yield dapi
                .upload(postFromState.parentFolder + "/" + postFromState.title,
                  dehydrateForUpload(postFromState.source),
                  "overwrite", false, false, unixEpochToDropboxDateString(postFromState.modifiedAt));
            }
          }
          //done: only dispatch new one if the info above is different.
          if (metadata && metadata.id !== action.post.id)
            yield dispatch({
              type: UPDATE_POST,
              [$NO_PUST_TO_SERVICE]: true,
              post: {
                id: action.post.id,
                $updatedId: metadata.id
              }
            });
        } catch (e) {
          console.warn('exception during upload', e);
        }
      }
    }

    yield call(delay, 500);
  }
}

export const PULL_POST_FROM_SERVICE = "PULL_POST_FROM_SERVICE";
export function* pullPostFromService() {
  "use strict";
  //feature: pull posts with differential synchronization
  while (true) {
    const {state, action} = yield take([PULL_POST_FROM_SERVICE, "SELECT_POST"]);
    const {accounts} = state;
    const {postId} = action;
    const _post = state.posts[postId];
    let account = state.accounts[_post.accountKey];
    if (!account || !_post.accountKey || !isDropboxId(postId)) {
      console.warn('post does not have accountKey or postId is not dropbox form. This might be occur ' +
        'because the post has not been uploaded to dropbox yet.');
    } else {
      let accessToken = account.accessToken;
      if (fileIsBlackListed(_post.title)) {
        if (accountKeyIsService(_post.accountKey, "dropbox")) {
          dapi.updateAccessToken(accessToken);
          try {
            let response;
            if (extensionSupportPreview(_post.title)) {
              response = yield dapi.getPreview(_post.id || _post.parentFolder + "/" + _post.title);
            } else {
              response = yield dapi.downloadBlob(_post.id || _post.parentFolder + "/" + _post.title);
            }
            const {id, name: title, path_display: parentFolder} = response.metadata || {};
            let newAction = {
              type: UPDATE_POST,
              [$NO_PUST_TO_SERVICE]: true,
              post: {
                id: postId,
                title,
                parentFolder: parentFolder.split('/').slice(0, -1).join('/'),
                previewURL: URL.createObjectURL(response.blob)//note: this is a PDF string.
              }
            };
            if (response.metadata.id !== postId) newAction.post.$updatedId = response.metadata.id;
            yield dispatch(newAction);
          } catch (e) {
            console.warn("download preview failed", e);
          }
        }
      } else {
        if (accountKeyIsService(_post.accountKey, "dropbox")) {
          dapi.updateAccessToken(accessToken);
          try {
            // use id:<file_id> as the parentFolder
            let response = yield dapi.download(
              isDropboxId(postId) ? postId : _post.parentFolder + '/' + _post.title,
            );
            let metadata = response.metadata;
            console.log("pulling request: metadata is:", metadata);
            const {id, name: title, path_display: parentFolder} = metadata;
            let newAction = {
              type: UPDATE_POST,
              [$NO_PUST_TO_SERVICE]: true,
              post: {
                id: postId,
                title,
                parentFolder: parentFolder.split('/').slice(0, -1).join('/'),
                source: hydrateAfterDownload(response.content)
              }
            };
            if (response.metadata.id !== postId) newAction.post.$updatedId = response.metadata.id;
            yield dispatch(newAction);
          } catch (e) {
            console.warn('exception during pulling', e);
          }
        }
      }
    }
    yield call(delay, 500);
  }

}

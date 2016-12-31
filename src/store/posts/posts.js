/** Created by ge on 4/7/16. */
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_PRESENCE = "UPDATE_POST_PRESENCE";
export const UPSERT_POST = "UPSERT_POST";
export const DELETE_POST = "DELETE_POST";
export const MERGE_POST = "MERGE_POST";
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
    if (!post) return;
    if (!post.id) return;
    return {_v: 0, _v0: 0, ...action.post}
  } else if (action.type === UPDATE_POST) {
    if (state.id !== action.post.id) return state;
    let newPost = {
      ...state,
      ...action.post,
      presence: presence(state.presence, action),
      // allow the editor to override this.
      _v: action.post._v || (state._v + 1)
    };
    return newPost
  } else if (action.type === OVERWRITE_POST) {
    if (state.id !== action.post.id) return state;
    let newPost = {
      ...(action.post), presence: presence(state.presence, action), _v: (state._v + 1)
    };
    return newPost;
  } else if (action.type === UPDATE_POST_PRESENCE) { // does not update the version number
    if (state.id !== action.post.id) return state;
    return {
      ... state, presence: presence(state.presence, action)
    }
  } else if (action.type === MERGE_POST) {
    if (state.id !== action.post.id) return state;
    if (state._v <= action.post._v) {
      return {...state, ...(action.post), _v0: action.post._v}
    } else {
      console.log('remote fetch version is older than this one', state, action.post);
      return state;
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
    //fixme: update the key of post in posts collection when file id has changed.
    const thisPost = state[action.post.id];
    if (!thisPost) return state;
    let updatedPost = post(thisPost, action);
    if (updatedPost == thisPost) return state;
    return {
      ...state,
      [updatedPost.id]: updatedPost
    };
  } else if (action.type === DELETE_POST) {
    const thisPost = state[action.id];
    if (!thisPost) return state;
    let newState = {...state};
    delete newState[action.id];
    return newState;
  } else if (action.type === UPSERT_POST) {
    if (state[action.post.id]) return state.map((it) => post(it, action));
    else return posts(state, {
      ...action,
      type: ADD_POST
    })
  } else if (action.type === MERGE_POST) {
    if (!action.post) return state;
    if (state[action.post.id]) return state.map(it => post(it, action));
    else return posts(state, {
      ...action,
      type: ADD_POST
    });
  } else {
    return state;
  }
}

import {$uuid} from  '../../lib/$uuid';
export function createPost() {
  return {
    type: ADD_POST,
    post: {
      id: $uuid(),
      // parentFolder, //'in dropbox',
      // accountKey,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
  }
}

import {accountKeyIsService, isDropboxId, unixEpochToDropboxDateString} from "../accounts/accounts";
import {select, take, delay, call, dispatch} from "luna-saga";

//fixme: implement process to dedupe repetitive posts that share same parentFolder and dropbox id.
export function* dedupePosts() {
  "use strict";
}

function fileIsBlackListed(title = "") {
  "use strict";
  return (title.match(/\.(docx?|png)$/));
}

function fileIsWhiteListedForUpload(title = "") {
  "use strict";
  //todo: add url to this list *after* adding editor view with built-in iframe preview.
  return (title.match(/\.(md|txt)$/));
}

function extensionSupportPreview(title = "") {
  "use strict";
  return (title.match(/\.(docx?)$/));
}

import dapi from "../../modules/dropbox";
//done: move `postPost` to proper place
//resolved: can NOT push (upload) post by post.id. Post.id are only used in pulling.
export function* pushPost() {
  "use strict";
  while (true) {
    //todo: use MERGE_POST type instead?
    //reminder: race condition when switching between different posts, updates gets ignored.
    let oldPosts = yield select('posts');
    const {state, action} = yield take("UPDATE_POST");
    const {accounts} = state;
    let postFromState = state.posts[action.post.id];

    if (fileIsBlackListed(postFromState.title || action.post.title)) {
      console.warn("file update has been prevented");
    } else if (fileIsWhiteListedForUpload(postFromState.title || action.post.title)) {
      let account = state.accounts[postFromState.accountKey];
      if (accountKeyIsService(postFromState.accountKey, "dropbox")) {
        let accessToken = account.accessToken;
        dapi.updateAccessToken(accessToken);
        try {
          // note: saga is single threaded. If it hangs here, it will not
          // take on more "UPDATE_POST" events.
          let response;
          //fixme: urgent: the upload only runs once, logic here is very unsound.
          let oldPost = oldPosts[action.post.id];
          if (!oldPost) {
            response = yield dapi.upload(postFromState.parentFolder + '/' + postFromState.title, postFromState.source, "overwrite", false, false, unixEpochToDropboxDateString(postFromState.modifiedAt));
          } else {
            //fixed: somehow, exception thrown here from the api call promise is 1. not properly caught. 2. stops further
            //done: use id:<file_id> as the parentFolder, make sure `post.id` is dropbox id.
            //backlog: use collaboration to make sure the correct version is saved.
            //notice: we assume that only one of the title and the content are changed.
            if (action.post.title && oldPost.title !== postFromState.title) {
              response = yield dapi.move(
                oldPost.parentFolder + '/' + oldPost.title,
                postFromState.parentFolder + '/' + postFromState.title, "overwrite", false, false);
            }
            if (typeof action.post.source !== "undefined" && action.post.source !== oldPost.source) {
              console.log('=====> Now upload');
              response = yield dapi.upload(postFromState.parentFolder + "/" + postFromState.title, postFromState.source, "overwrite", false, false, unixEpochToDropboxDateString(postFromState.modifiedAt));
            }
          }
          // console.log(response);
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
          let result = yield dispatch({
            type: UPDATE_POST,
            post: {
              id: postId,
              title: response.metadata.name,
              // this is a PDF string.
              previewURL: URL.createObjectURL(response.blob)
            }
          });

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
          //, "\ncontent is: ", response.content);
          // yield dispatch
          let result = yield dispatch({
            type: UPDATE_POST,
            post: {
              id: postId,
              //notice: hydrate the <string> type content to javascript object
              //notice: right now this just overwrites local copy.
              title: metadata.name,
              source: response.content
            }
          });
        } catch (e) {
          console.warn('exception during pulling', e);
        }
      }
    }
    yield call(delay, 500);
  }

}

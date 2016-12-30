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
      // path, //'in dropbox',
      // accountKey,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
  }
}

import {accountKeyIsService, isDropboxId} from "../accounts/accounts";
import {select, take, delay, call, dispatch} from "luna-saga";

//fixme: implement process to dedupe repetitive posts that share same path and dropbox id.
export function* dedupePosts() {
  "use strict";
}

import dapi from "../../modules/dropbox";
//done: move `postPost` to proper place
//fixme: need to push post by post.id. Path allows empty post to overwrite existing files.
export function* pushPost() {
  "use strict";
  let oldPosts = yield select('posts');
  while (true) {
    //todo: use MERGE_POST type instead?
    const {state, action} = yield take("UPDATE_POST");
    const {accounts} = state;
    const {post} = action;
    let _post = state.posts[post.id];
    // console.log(_post);
    let account = state.accounts[_post.accountKey];
    if (accountKeyIsService(_post.accountKey, "dropbox")) {
      let accessToken = account.accessToken;
      dapi.updateAccessToken(accessToken);
      try {
        // note: saga is single threaded. If it hangs here, it will not
        // take on more "UPDATE_POST" events.
        let response;
        //fixme: urgent: the upload only runs once, logic here is very unsound.
        if (post.title) {
          //issue: somehow, exception thrown here from the api call promise is 1. not properly caught. 2. stops further
          //backlog: use id:<file_id> as the path, make sure `post.id` is dropbox id.
          //backlog: use collaboration to make sure the correct version is saved.
          // response = yield dapi.move(post.id, _post.path + '/' + _post.title, "overwrite", false, false);

          let oldPost = oldPosts[post.id];
          if (!oldPost) {
            response = yield dapi.upload(_post.path + '/' + _post.title, _post.source, "overwrite", false, false);
          } else if (oldPost.title !== _post.title) {
            response = yield dapi.move(
              isDropboxId(post.id) ? post.id : _post.path + '/' + oldPost.title,
              _post.path + '/' + _post.title, "overwrite", false, false);
            // now update local copy.
            oldPosts[post.id] = {
              ...(oldPosts[post.id] || {}),
              ...post
            };
          }
        } else {
          response = yield dapi.upload(_post.path + '/' + _post.title, _post.source, "overwrite", false, false);
        }
        // console.log(response);
      } catch (e) {
        console.warn('exception during upload', e);
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
    // console.log(_post);
    let account = state.accounts[_post.accountKey];
    if (accountKeyIsService(_post.accountKey, "dropbox")) {
      let accessToken = account.accessToken;
      dapi.updateAccessToken(accessToken);
      try {
        // use id:<file_id> as the path
        let response = yield dapi.download(
          isDropboxId(postId) ? postId : _post.path + '/' + _post.title,
        );
        let meta = JSON.parse(response.meta);
        console.log("meta is:", meta)
        // yield dispatch
        let result = yield dispatch({
          type: UPDATE_POST,
          post: {
            id: postId,
            //notice: hydrate the <string> type content to javascript object
            //notice: right now this just overwrites local copy.
            title: meta.name,
            source: response.content
          }
        });
        console.log('========>', result);

      } catch (e) {
        console.warn('exception during pulling', e);
      }
    }
    yield call(delay, 500);
  }

}

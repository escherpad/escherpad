/** Created by ge on 4/7/16. */
import {combineReducers} from "luna";

export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_PRESENCE = "UPDATE_POST_PRESENCE";
export const UPSERT_POST = "UPSERT_POST";
export const DELETE_POST = "DELETE_POST";
export const MERGE_POST = "MERGE_POST";

export function presence(state = {}, action) {
  if (action.post && action.post.presence) return {...state, ...action.post.presence};
  else return state;
}

export function post(state={}, action) {
  if (!action.type) {
    return state;
  } else if (action.type === ADD_POST) {
    let post = action.post;
    if (!post) return;
    if (!post.id) return;
    return {_v: 0, _v0: 0, ...action.post}
  } else if (action.type === UPDATE_POST) {
    if (state.id !== action.post.id) return state;
    return {
      ... state, ...(action.post), presence: presence(state.presence, action), _v: (state._v + 1)
    }
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
  } else if (action.type === UPDATE_POST || action.type === UPDATE_POST_PRESENCE) {
    let updatedPost = post(state[action.post.id], action);
    if (updatedPost == state[action.post.id]) return state;
    let newState = {...state};
    newState[updatedPost.id] = updatedPost;
    return newState;
  } else if (action.type === DELETE_POST) {
    if (!state[action.id]) return state;
    let newState = {...state};
    delete newState[action.id];
    return newState;
  } else if (action.type === UPSERT_POST) {
    if (state[action.post.id]) return state.map((it)=>post(it, action));
    else return posts(state, {...action, type: ADD_POST})
  } else if (action.type === MERGE_POST) {
    if (!action.post) return state;
    if (state[action.post.id]) return state.map(it => post(it, action));
    else return posts(state, {...action, type: ADD_POST});
  } else {
    return state;
  }
}

import {$uuid} from  '../utils/$uuid';
export function createPost() {
  return {
    type: ADD_POST,
    post: {
      id: $uuid(),
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }
  }
}

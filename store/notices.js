/** Created by ge on 12/24/16. */
import {$uuid} from "../lib/$uuid";
import {take, dispatch, call, delay} from "luna-saga";

export function createNotification(type, message, timeout) {
  let id = $uuid();
  let action = {
    type,
    message: {
      id,
      timeout,
      timeCreated: Data.now(),
      ...message,
    }
  };
  if (typeof timeout !== "undefined") action.timeout = timeout;
  return action
}

export function notices(state = {}, action) {
  if (action.type === "NOTICE_ADD") {
    return {
      ...state,
      [action.message.id]: action.message
    };
  } else if (action.type === "NOTICE_DELETE") {
    let newState = {...state};
    delete newState[action.id];
    return newState;
  } else if (action.type === "NOTICE_UPDATE") {
    //backlog: decide if want to update by field
    return {
      ...state,
      [action.message.id]: action.message
    }
  }
  return state;
}

function* noticeTimeout(id, timeout) {
  yield call(delay, timeout);
  return dispatch({
    type: "NOTICE_DELETE",
    id
  });
}

export function* noticeProc() {
  "use strict";
  //noinspection InfiniteLoopJS
  while (true) {
    try {
      let {state, action} = yield take(/NOTICE_ADD/);
      let id = action.message.id;
      let timeout = action.timeout;
      action = null;
      yield call(noticeTimeout, id, timeout);
      /*can not intercept the delete action from within the child process.*/
    } catch (e) {
      console.warn('exception occurs in process: noticeProc', e);
    }
  }
}

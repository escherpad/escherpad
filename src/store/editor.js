/** Created by ge on 4/7/16. */
  import {UPDATE_POST} from "./posts/posts";
export const SELECT_POST = "SELECT_POST";
export const UPDATE_EDITOR_OPTIONS = "UPDATE_EDITOR_OPTIONS";

export const editorInitialState = {
  options: {
    keyboardHandler: "",
    theme: "chrome",
    fontSize: 12,
    lineHeight: 2
  }
};
export function editor(state = editorInitialState, action) {
  if (!action.type) return state;
  if (action.type === SELECT_POST) {
    return {
      ...state, postId: action.postId
    }
  } else if (action.type === UPDATE_EDITOR_OPTIONS) {
    if (!action.options) return state;
    return {
      ...state,
      options: {...state.options, ...action.options}
    };
  } else if (action.type === UPDATE_POST) {
    if (action.post.$updatedId && action.post.id === state.postId) {
      return {
        ...state, postId: action.post.$updatedId
      };
    }
    return state;
  } else {
    return state;
  }
}

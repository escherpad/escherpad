/** Created by ge on 4/7/16. */
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
      ...state, post: action.post
    }
  } else if (action.type === UPDATE_EDITOR_OPTIONS) {
    if (!action.options) return state;
    return {
      ...state,
      options: {...state.options, ...action.options}
    };
  } else {
    return state;
  }
}

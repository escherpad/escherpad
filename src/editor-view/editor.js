/** Created by ge on 4/7/16. */
export const SELECT_POST = "SELECT_POST";

export function editor(state={}, action) {
  if (!action.type) return state;
  if (action.type === SELECT_POST) {
    return {
      ...state, post: action.post
    }
  } else {
    return state;
  }
}

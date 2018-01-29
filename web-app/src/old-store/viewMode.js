/** Created by ge on 4/27/16. */

export function viewMode(state = "zen-mode", action) {
  if (action.type === "SET_ZEN_MODE") {
    return "zen-mode";
  } else if (action.type === "SET_FULL_VIEW") {
    return "full-view";
  } else {
    return state;
  }
}

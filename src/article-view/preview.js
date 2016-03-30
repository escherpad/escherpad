/** Created by ge on 3/24/16. */
export const PATCH_PREVIEW = "PATCH_PREVIEW";
export const SET_SOURCE = "SET_SOURCE";
export const SET_RENDERED = "SET_RENDERED";

const initialState = {
  source: "",
  rendered: ""
};
export function preview(state = initialState, action) {
  if (action.type === PATCH_PREVIEW) {
    return Object.assign({}, state, action.patch);
  } else if (action.type === SET_SOURCE) {
    return Object.assign({}, state, {source: action.source});
  } else if (action.type === SET_RENDERED) {
    return Object.assign({}, state, {rendered: action.rendered});
  } else {
    return state;
  }
}

export function setSource(source) {
  return {
    type: SET_SOURCE,
    source: source
  }
}
export function renderPreview(rendered) {
  return {
    type: SET_RENDERED,
    source: rendered
  }
}

export function* previewProc() {
  while (true) {
    let {action} = yield take(SET_SOURCE);
    let rendered = marked(action.source);
    yield renderPreview(rendered);
  }
}

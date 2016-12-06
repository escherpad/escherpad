/** Created by ge on 12/6/16. */

export default function ModalReducer(key, dataReducer) {
  let MODAL_OPEN = key.toUpperCase() + "_OPEN";
  let MODAL_CLOSE = key.toUpperCase() + "_CLOSE";
  let MODAL_TOGGLE = key.toUpperCase() + "_TOGGLE";
  return function reducer(state = {open: false}, action) {
    "use strict";
    if (action.type == MODAL_OPEN) {
      if (state.open) return state;
      return {
        open: true,
        ...state
      };
    } else if (action.type == MODAL_CLOSE) {
      if (!state.open) return state;
      return {
        open: false,
        ...state
      };
    } else if (action.type == MODAL_TOGGLE) {
      return {
        open: !state.open,
        ...state
      }
    } else if (dataReducer) {
      return dataReducer(state, action);
    }
    return state;
  }
}

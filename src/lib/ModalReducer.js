/** Created by ge on 12/6/16. */

export default function ModalReducer(key, dataReducer) {
  let MODAL = key.toUpperCase();
  let MODAL_OPEN = MODAL + "_OPEN";
  let MODAL_CLOSE = MODAL + "_CLOSE";
  let MODAL_TOGGLE = MODAL + "_TOGGLE";
  return function reducer(state = {open: false}, action) {
    let _state = state;
    switch (action.type) {
      case MODAL_OPEN:
        if (!state.open) _state = {
          ...state,
          open: true
        };
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL_CLOSE:
        if (state.open) _state = {
          ...state,
          open: false
        };
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL_TOGGLE:
        _state = {
          ...state,
          open: !state.open
        };
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL:
        if (dataReducer) return dataReducer(state, action);
      default:
        return state;
    }
  }
};

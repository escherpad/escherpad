"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ModalReducer;
/** Created by ge on 12/6/16. */

function ModalReducer(key, dataReducer) {
  var MODAL = key.toUpperCase();
  var MODAL_OPEN = MODAL + "_OPEN";
  var MODAL_CLOSE = MODAL + "_CLOSE";
  var MODAL_TOGGLE = MODAL + "_TOGGLE";
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { open: false };
    var action = arguments[1];

    var _state = state;
    switch (action.type) {
      case MODAL_OPEN:
        if (!state.open) _state = _extends({}, state, {
          open: true
        });
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL_CLOSE:
        if (state.open) _state = _extends({}, state, {
          open: false
        });
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL_TOGGLE:
        _state = _extends({}, state, {
          open: !state.open
        });
        if (dataReducer) return dataReducer(_state, action);
        return _state;
      case MODAL:
        if (dataReducer) return dataReducer(state, action);
      default:
        return state;
    }
  };
};
//# sourceMappingURL=ModalReducer.js.map
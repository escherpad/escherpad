"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** Created by ge on 12/24/16. */


exports.createNotification = createNotification;
exports.notices = notices;
exports.noticeProc = noticeProc;

var _$uuid = require("../lib/$uuid");

var _lunaSaga = require("luna-saga");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(noticeTimeout),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(noticeProc);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createNotification(type, message, timeout) {
  var id = (0, _$uuid.$uuid)();
  var action = {
    type: type,
    message: _extends({
      id: id,
      timeout: timeout,
      timeCreated: Date.now()
    }, message)
  };
  if (typeof timeout !== "undefined") action.timeout = timeout;
  return action;
}

function notices() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.type === "NOTICE_ADD") {
    return _extends({}, state, _defineProperty({}, action.message.id, action.message));
  } else if (action.type === "NOTICE_DELETE") {
    var newState = _extends({}, state);
    delete newState[action.id];
    return newState;
  } else if (action.type === "NOTICE_UPDATE") {
    //backlog: decide if want to update by field
    return _extends({}, state, _defineProperty({}, action.message.id, action.message));
  }
  return state;
}

function noticeTimeout(id, timeout) {
  return regeneratorRuntime.wrap(function noticeTimeout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _lunaSaga.call)(_lunaSaga.delay, timeout);

        case 2:
          return _context.abrupt("return", (0, _lunaSaga.dispatch)({
            type: "NOTICE_DELETE",
            id: id
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function noticeProc() {
  "use strict";
  //noinspection InfiniteLoopJS

  var _ref, state, action, id, timeout;

  return regeneratorRuntime.wrap(function noticeProc$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 19;
            break;
          }

          _context2.prev = 1;
          _context2.next = 4;
          return (0, _lunaSaga.take)(/NOTICE_ADD/);

        case 4:
          _ref = _context2.sent;
          state = _ref.state;
          action = _ref.action;
          id = action.message.id;
          timeout = action.timeout;

          action = null;
          _context2.next = 12;
          return (0, _lunaSaga.call)(noticeTimeout, id, timeout);

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);

          console.warn('exception occurs in process: noticeProc', _context2.t0);

        case 17:
          _context2.next = 0;
          break;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 14]]);
}
//# sourceMappingURL=notices.js.map
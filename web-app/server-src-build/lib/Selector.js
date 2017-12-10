"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Selector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _coreDecorators = require("core-decorators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
} /** Created by ge on 12/6/16.
   * Usage Example
   * Selector(key/selectionFunction/arrayOf'keys/etc, component)
   * */

var func = _react.PropTypes.func,
    any = _react.PropTypes.any;
function Selector(selector, Component) {
  var _class, _temp, _desc, _value, _class2;

  return _temp = _class = (_class2 = function (_React$Component) {
    _inherits(SelectContainer, _React$Component);

    function SelectContainer() {
      _classCallCheck(this, SelectContainer);

      return _possibleConstructorReturn(this, (SelectContainer.__proto__ || Object.getPrototypeOf(SelectContainer)).apply(this, arguments));
    }

    _createClass(SelectContainer, [{
      key: "storeToState",
      value: function storeToState(store) {
        this.setState(selector(store));
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.subscription = this.props.store.subscribe(this.storeToState);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.subscription.unsubscribe();
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(newProps, newStates) {
        // note: both store and dispatch are required.
        // note2: state update *always* trigger re-render
        if (Object.keys(newProps).length > 2) return true;
        return false;
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.state) return _react2.default.createElement("div", null);
        var props = _extends({}, this.state, this.props);
        return _react2.default.createElement(Component, props);
      }
    }]);

    return SelectContainer;
  }(_react2.default.Component), (_applyDecoratedDescriptor(_class2.prototype, "storeToState", [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, "storeToState"), _class2.prototype)), _class2), _class.propTypes = {
    store: any.isRequired,
    dispatch: func.isRequired
  }, _temp;
}
//# sourceMappingURL=Selector.js.map
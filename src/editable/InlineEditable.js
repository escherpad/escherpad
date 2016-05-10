/** Created by ge on 4/10/16. */
import React, {Component, PropTypes} from 'react';
import ReactDOM from "react-dom";

require('./inline-editable.scss');
var {string, bool, func, any} = PropTypes;
export default class InlineEditable extends Component {
  static propTypes = {
    tagName: string,
    style: any,
    editable: bool,
    value: string,
    onChange: func
  };

  constructor() {
    super();
    this._resize = this.resize.bind(this);
  }

  componentWillReceiveProps(newProp) {
    var {value} = newProp;
    if (value != this.props.value) {
      this.silent = true;
      this.value = value;
      this.silent = false;
    }
  }

  render() {
    let {tagName="div", style, className, editable=true, placeholder = "placeholder", ..._props} = this.props;
    className += " inline-editable";
    if (this.isEmpty(this.value))
      className += " placeholder";
    let props = {
      style,
      className,
      contentEditable: editable,
      placeholder,
      onBlur: this._resize,
      onFocus: this._resize,
      onInput: this.onInput.bind(this),
      onKeyDown: this._resize,
      autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false",
      ..._props
    };
    return React.createElement(tagName, props)
  }

  componentWillMount() {
    this.silent = true; // silent change events
    this.value = this.props.value;
    this.silent = false;
  }

  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.setHtml(this.value);
    window.addEventListener('resize', this._resize);
    window.addEventListener('reflow', this._resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
    window.removeEventListener('reflow', this._resize);
  }

  set value(value) {
    this._value = value;
    this.setHtml(value);
    if (!this.silent) this.onChangeValue(this.value);
  }

  get value() {
    // get processing
    return this._value
  }

  setHtml(value) {
    // processing should happen here.
    let content = this.isEmpty(value) ? "<br>" : value;
    if (this.nativeElement) this.nativeElement.innerHTML = content;
  }

  // return both value and cursor position together.
  onChangeValue(value) {
    if (!this.props || !this.props.onChange) return;
    let cursor;
    this.props.onChange(value, cursor);
  }

  isEmpty(value) {
    var isEmpty = false;
    if (!value || value == "<br>" || value === "<br/>" || value === "<br><br>" || value === "<br/><br/>" || value === "\n" || value === "\n\n") {
      isEmpty = true
    }
    return isEmpty
  }

  resize() {
    let inputElem = ReactDOM.findDOMNode(this);
    let height = inputElem.scrollHeight;
    let originalHeight = inputElem.clientHeight;
    inputElem.style.height = (height - 1 ) + "px";
    while (inputElem.scrollHeight < (height - 1) || inputElem.scrollHeight < 1) {
      height--;
      inputElem.style.height = (height - 1 ) + "px";
    }
    inputElem.style.height = inputElem.scrollHeight + "px";
    // if (inputElem.clientHeight !== originalHeight) {
    //   this.nativeElement.dispatchEvent(new CustomEvent("reflow", {target: this.nativeElement}));
    // }
  }

  onInput(e) {
    let value = e.target.innerHTML;
    var {onChange} = this.props;
    if (onChange) onChange(value);
    this.resize();
  }
}



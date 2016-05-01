/** Created by ge on 4/10/16. */
import React from 'react';
import ReactDOM from "react-dom";

require('./inline-editable.scss');
export default class InlineEditable extends React.Component {
  static propTypes = {
    tagName: React.PropTypes.string,
    style: React.PropTypes.any,
    editable: React.PropTypes.bool,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

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
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onInput: this.onInput.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
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
    while (inputElem.scrollHeight <= height || inputElem.scrollHeight < 1) {
      height--;
      inputElem.style.height = (height - 1 ) + "px";
    }
    inputElem.style.height = inputElem.scrollHeight + "px";
    if (inputElem.clientHeight !== originalHeight) {
      this.nativeElement.dispatchEvent(new CustomEvent("reflow", {target: this.nativeElement}));
    }
  }

  onBlur() {
    this.resize();
  }

  onFocus() {
    this.resize();
  }

  onInput(e) {
    let value = e.target.innerHTML;
    if (this.props.onChange) this.props.onChange(value);
    this.resize();
  }

  onKeyDown() {
    this.resize();
  }

}



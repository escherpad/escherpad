/** Created by ge on 4/10/16. */
import React, {Component, PropTypes} from 'react';
import ReactDOM from "react-dom";
import {autobind} from "core-decorators";

require('./inline-editable.scss');
var {string, bool, func, any} = PropTypes;
export default class InlineEditable extends Component {
  static propTypes = {
    component: string,
    style: any,
    editable: bool,
    value: string,
    onChange: func
  };

  constructor() {
    super();
  }

  render() {
    let {component = "div", style, className, editable = true, placeholder = "placeholder", ..._props} = this.props;
    className += " inline-editable";
    if (this.isEmpty(this.value))
      className += " placeholder";
    let props = {
      ref: "element",
      style,
      className,
      contentEditable: editable,
      placeholder,
      onBlur: this.resize,
      onFocus: this.resize,
      onInput: this.onInput,
      onKeyDown: this.resize,
      onPaste: this.onPaste,
      onCopy: this.onCopy,
      onCut: this.onCut,
      autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false",
      ..._props
    };
    return React.createElement(component, props)
  }

  componentWillMount() {
    this.value = this.props.value;
  }

  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.setHtml(this._value);
    window.addEventListener('resize', this.resize);
    window.addEventListener('reflow', this.resize);
  }

  componentWillReceiveProps(newProp) {
    var {value} = newProp;
    if (value != this.props.value) {
      this.value = value;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('reflow', this.resize);
  }

  // does not take into account of cursor position yet.
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this.setHtml(value);
    }
  }

  get value() {
    // get processing
    if (this.nativeElement) {
      this._value = this.nativeElement.innerText;
    }
    return this._value;
  }

  get caretPosition() {
    let selection = window.getSelection();
    return selection.focusOffset;
  }


  setHtml(value) {
    // processing should happen here.
    let content = this.isEmpty(value) ? "<br>" : value;
    if (this.nativeElement) this.nativeElement.innerHTML = content;
  }

  isEmpty(value) {
    var isEmpty = false;
    if (!value || value == "<br>" || value === "<br/>" || value === "<br><br>" || value === "<br/><br/>" || value === "\n" || value === "\n\n") {
      isEmpty = true
    }
    return isEmpty
  }

  @autobind
  resize() {
    let inputElem = ReactDOM.findDOMNode(this);
    let height = inputElem.scrollHeight;
    let originalHeight = inputElem.clientHeight;
    inputElem.style.height = (height - 1 ) + "px";
    while (inputElem.scrollHeight < (height + 1) || inputElem.scrollHeight < 1) {
      height--;
      inputElem.style.height = (height - 1 ) + "px";
    }
    inputElem.style.height = inputElem.scrollHeight + "px";
    // if (inputElem.clientHeight !== originalHeight) {
    //   this.nativeElement.dispatchEvent(new CustomEvent("reflow", {target: this.nativeElement}));
    // }
  }

  @autobind
  onInput(e) {
    let {onChange} = this.props;
    // force a call to the get method
    let value = this.value;
    if (onChange) onChange(value);
    this.resize();
  }

  @autobind
  onPaste(e) {
    let {onPaste} = this.props;
    var text = e.clipboardData.getData("Text");
    if (onPaste) text = onPaste(text);
    // todo: full behavior: 1. split text by caret, 2.
    e.preventDefault();
    let caret = this.caretPosition;
    let currentText = this.value;
    let result = currentText.slice(0, caret) + text + currentText.slice(caret + 1);
    this.value = result;
    this.onInput(e);
  }

  @autobind
  onCopy(e) {
    let {onCopy} = this.props;
    let text = this.value;
    // if (isIe) {
    //   window.clipboardData.setData('Text', text);
    // } else {
    e.clipboardData.setData('text/plain', text);
    // }
    if (onCopy) onCopy(text);
    e.preventDefault()
  }

  @autobind
  onCut(e) {
    let {onCut} = this.props;
    let text = this.value;
    // if (isIe) {
    //   window.clipboardData.setData('Text', text);
    // } else {
    e.clipboardData.setData('text/plain', text);
    // }
    if (onCut) onCut(text);
    // todo: investigate default behavior of cut action besides deleting the text.
    // e.preventDefault()
  }

}



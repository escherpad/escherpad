/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';
import EditorHeader from "./PostHeader";

import brace from "brace";
import AceEditor from "../AceEditor/AceEditor";

import 'brace/mode/markdown';
import 'brace/keybinding/vim';
import 'brace/theme/github';
import 'brace/theme/chrome';

const styles = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const options = {
  maxLines: Infinity,
  $blockScrolling: Infinity,
  $wrapLimit: 80,
  animatedScroll: true,
  autoScrollEditorIntoView: true
};
@Radium
export default class CodeEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    value: React.PropTypes.string,
    cursorPosition: React.PropTypes.any,
    version: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onChangeScrollTop: React.PropTypes.func
  };

  render() {
    let value = this.props.value;
    let cursorPosition = this.props.cursorPosition;
    let version = this.props.version;
    let style = [this.props.style, styles];
    return (
      <div className="editor-container" style={style}>
        <AceEditor
          key={this.key}
          ref={(_)=>this.Editor=_}
          mode="markdown"
          value={value}
          cursorPosition={cursorPosition}
          version={version}
          theme="chrome"
          width={`${this.state.parentWidth}px`}
          height={`${this.state.parentHeight}px`}
          lineHeight={2}
          scrollMargin={{bottom: "900"}}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          onChange={this.props.onChange}
          onChangeScrollTop={this.props.onChangeScrollTop}
          name="UNIQUE_ID_OF_DIV"
          editorProps={options}
          keyboardHandler=""
          wrapEnabled={true}
        />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('reflow', this.onResize);
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('reflow', this.onResize);
  }

  resize() {
    let node = ReactDOM.findDOMNode(this);
    this.setState({parentHeight: node.clientHeight, parentWidth: node.clientWidth});
  }

  onResize = () => {
    this.resize();
  };

  focus() {
    this.Editor.focus();
  }

  setCursor(position) {
    this.Editor.setCursor(position, false);
  }

  clearSelection() {
    this.Editor.clearSelection();
  }

  getScrollTop() {
    return this.Editor.getScrollTop()
  }

  setScrollTop(scrollTop) {
    this.Editor.setScrollTop(scrollTop);
    return this;
  }

}

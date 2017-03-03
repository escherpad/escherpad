/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

import brace from "brace";
import 'brace/mode/markdown';
import 'brace/keybinding/vim';
import 'brace/theme/github';
import 'brace/theme/chrome';
import 'brace/mode/snippets';
import AceEditor from "../ace-editor/AceEditor";


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
    value: React.PropTypes.string,
    cursorPosition: React.PropTypes.any,
    version: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onChangeScrollTop: React.PropTypes.func,
    style: React.PropTypes.any,
  };

  render() {
    let {value, cursorPosition, version, onChange, onChangeScrollTop, style, ...props} = this.props;
    let _style = [this.props.style, styles];
    return (
      <div className="editor-container" style={_style}>
        <AceEditor
          key={this.key}
          ref={(_) => this.Editor = _}
          value={value}
          cursorPosition={cursorPosition}
          version={version}
          mode="markdown"
          // lineHeight={2}
          // keyboardHandler="vim"
          // theme="chrome"
          editorProps={options}
          wrapEnabled={true}
          width={`${this.state.parentWidth}px`}
          height={`${this.state.parentHeight}px`}
          scrollMargin={{bottom: "900"}}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          showInvisibles={true}
          onChange={onChange}
          onChangeScrollTop={onChangeScrollTop}
          name="UNIQUE_ID_OF_DIV"
          {...props}
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

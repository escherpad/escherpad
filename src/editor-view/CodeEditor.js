/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';
import EditorHeader from "./EditorHeader";

import brace from "brace";
import AceEditor from "react-ace";

import 'brace/mode/markdown';
import 'brace/keybinding/vim';
import 'brace/theme/github';

const styles = {
  container: {
    position: "relative"
  },
  editor: {
    display: "block",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

const options = {
  $blockScrolling: Infinity,
  animatedScroll: true
};
@Radium
export default class CodeEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onCursorChange: React.PropTypes.func,
    onSelectionChange: React.PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('reflow', this.onResize);
    this.onResize();
    this.editor.container.style.lineHeight = 2;
    setTimeout(()=> {
      this.editor.resize();
    }, 100);
    this.editor.selection.on('changeCursor', this.onCursorChange);
    this.editor.selection.on('changeSelection', this.onSelectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('reflow', this.onResize);
    this.editor.selection.off('changeCursor', this.onCursorChange);
    this.editor.selection.off('changeSelection', this.onSelectionChange);
  }


  onCursorChange = ()=> {
    if (!this.props.onCursorChange) return;
    let cursor = this.editor.selection.getCursor();
    this.props.onCursorChange(cursor)
  };

  onSelectionChange = () => {
    if (!this.props.onSelectionChange) return;
    let selection = this.editor.getSelection();
    this.props.onSelectionChange(selection);
  };

  resize() {
    let node = ReactDOM.findDOMNode(this);
    let {height, width} = {height: node.clientHeight, width: node.clientWidth};
    this.parentHeight = height;
    this.parentWidth = width;
  }

  onResize = () => {
    this.resize();
    this.forceUpdate();
  };

  getEditor(e) {
    if (e && e.editor) this.editor = e.editor;
  }

  render() {
    let value = this.props.value || this.props.placeholder || "//placeholder";
    let style = [this.props.style, styles.container];
    let onChange = this.props.onChange;
    return (
      <div className="editor-container" style={style}>
        <AceEditor
          ref={this.getEditor.bind(this)}
          mode="markdown"
          value={value}
          theme="github"
          width={`${this.parentWidth}px`}
          height={`${this.parentHeight}px`}
          enableBasicAutocompletion={true}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          wrapEnabled={true}
          editorProps={options}
          keyboardHandler="vim"
        />
      </div>
    )
  }
}

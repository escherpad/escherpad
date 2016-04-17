/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';
import EditorHeader from "./EditorHeader";

import brace from "brace";
import AceEditor from "../AceEditor/AceEditor";

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
  animatedScroll: true,
  autoScrollEditorIntoView: true
};
@Radium
export default class CodeEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    value: React.PropTypes.string,
    cursorPosition: React.PropTypes.any,
    onChange: React.PropTypes.func,
    onChangeCursor: React.PropTypes.func,
    onChangeSelection: React.PropTypes.func,
    onChangeScrollTop: React.PropTypes.func
  };
  // static defaultProps = {
  // };

  render() {
    let value = this.props.value;
    let cursorPosition = this.props.cursorPosition;
    let style = [this.props.style, styles.container];
    return (
      <div className="editor-container" style={style}>
        <AceEditor
          ref={(_)=>this.Editor=_}
          mode="markdown"
          value={value}
          cursorPosition={cursorPosition}
          theme="github"
          width={`${this.state.parentWidth}px`}
          height={`${this.state.parentHeight}px`}
          lineHeight={2}
          enableBasicAutocompletion={true}
          onChange={this.props.onChange}
          onChangeCursor={this.props.onChangeCursor}
          onChangeSelection={this.props.onChangeSelection}
          onChangeScrollTop={this.props.onChangeScrollTop}
          name="UNIQUE_ID_OF_DIV"
          wrapEnabled={true}
          editorProps={options}
          keyboardHandler="vim"
        />
      </div>
    )
  }

  shouldComponentUpdate(newProps) {
    // we can always return true with this one because the aceEditor component behaves well.
    // return false;
    return true;
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

  setCursor(position) {
    this.Editor.setCursor(position, false);
  }


}

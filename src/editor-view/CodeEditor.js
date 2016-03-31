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

// app modules
import {rootStore} from "../app/rootStore";
import {setSource} from "../article-view/preview";

//rootStore.select("preview").subscribe((_)=>console.log("preview data: ", _));

import {PATCH_PREVIEW} from "../article-view/preview";

@Radium
export default class CodeEditor extends React.Component {
  static propTypes = {
    //style: React.PropTypes.any.isRequired
  };

  styles = {
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

  options = {
    //wrap: true,
    //wrapBehavioursEnabled:true,
    $blockScrolling: true
    //lineNumbers: true,
    //readOnly: false,
    //mode: "markdown" //"javascript"
  };

  onCodeChange(source) {
    rootStore.dispatch(setSource(source))
  }

  constructor() {
    super();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.editor.container.style.lineHeight = 2;
    console.log(this.editor);
    setTimeout(()=>{
      this.editor.resize();
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

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

  getEditor (e) {
    if (e && e.editor) this.editor = e.editor;
  }
  render() {
    return (
      <div className="editor-container" style={[this.props.style, this.styles.container]}>
        <AceEditor
          ref={(e)=>this.getEditor(e)}
          mode="markdown"
          value={(rootStore.getValue().preview.source || "")}
          theme="github"
          width={`${this.parentWidth}px`}
          height={`${this.parentHeight}px`}
          enableBasicAutocompletion={true}
          onChange={this.onCodeChange}
          name="UNIQUE_ID_OF_DIV"
          wrapEnabled={true}
          editorProps={this.options}
          keyboardHandler="vim"
        />
      </div>
    )
  }
}

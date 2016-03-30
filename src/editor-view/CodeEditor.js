/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import EditorHeader from "./EditorHeader";
import * as CodeMirror from "codemirror";
import Codemirror from "react-codemirror";
require("../../node_modules/codemirror/lib/codemirror.css");

// app modules
import {rootStore} from "../app/rootStore";
import {setSource} from "../article-view/preview";

rootStore.select("preview").subscribe((_)=>console.log("preview data: ", _));

import {PATCH_PREVIEW} from "../article-view/preview";

@Radium
export default class CodeEditor extends React.Component {
  static propTypes = {
    //style: React.PropTypes.any.isRequired
  };

  styles = {};

  options = {
    lineNumbers: true,
    readOnly: false,
    mode: "markdown" //"javascript"
  };

  onCodeChange(source) {
    rootStore.dispatch(setSource(source))
  }

  constructor() {
    super();
  }

  componentDidMount() {
    console.log('editor instance', this.editorNode);
    this.editor = this.editorNode.getCodeMirror();
    console.log(this.editor);
    console.log(CodeMirror);

    var charWidth = this.editor.defaultCharWidth(), basePadding = 4;
    var _that = this;
    this.editor.on("renderLine", function (cm, line, elt) {
      console.log('rendering line');
      var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
      elt.style.textIndent = "-" + off + "px";
      elt.style.paddingLeft = (basePadding + off) + "px";
    });
    this.editor.refresh();
  }

  render() {
    return (
      <Codemirror
        ref={(_)=> this.editorNode = _ }
        value={"example code"} onChange={this.onCodeChange} options={this.options}/>
    )
  }
}

/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import EditorHeader from "./EditorHeader";
import TitleBar from "./TitleBar";
import CodeEditor from "./CodeEditor";

@Radium
export default class EditorView extends React.Component {
  static propTypes = {
    style: React.PropTypes.any.isRequired
  };

  styles = {
    editor: {
    }
  };


  constructor() {
    super();
  }

  render() {
    return (
      <div className="editor-view" style={[this.props.style, this.styles.editor]}>
        <EditorHeader></EditorHeader>
        <TitleBar></TitleBar>
        <CodeEditor></CodeEditor>
      </div>
    )
  }
}

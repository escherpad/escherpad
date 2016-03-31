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
    container: {
      display: 'flex',
      flexDirection: "column"
    },
    fixed: {
      flex: "0 0 auto"
    },
    fluid: {
      flex: "1 1 auto"
    }
  };


  constructor() {
    super();
  }

  render() {
    return (
      <div className="editor-view" style={[this.props.style, this.styles.container]}>
        <EditorHeader style={this.styles.fixed}></EditorHeader>
        <TitleBar style={this.styles.fixed}></TitleBar>
        <CodeEditor style={this.styles.fluid}></CodeEditor>
      </div>
    )
  }
}

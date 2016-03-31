/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import EditorHeader from "./EditorHeader";

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    style: React.PropTypes.any.isRequired
  };

  styles = {
    editor: {
      left: 0,
      right: 0,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #ccc"
    },
    inlineBlocks: {
      display: "inline-block"
    },
    flexFixed: {
      flex: "0 0 auto",
    },
    flexFluid: {
      flex: "1 1 auto",
    },
    dropdownButton: {}
  };


  constructor() {
    super();
  }

  render() {
    return (
      <div className="title-bar" style={this.styles.container}>
        <div className="title" style={[this.styles.inlineBlocks, this.styles.flexFixed]}>A New Title</div>
        <button className="dropdown" style={[this.styles.inlineBlocks, this.styles.flexFixed]}>﹀</button>
        <div className="spacer" style={[this.styles.inlineBlocks, this.styles.flexFluid]}></div>
        <div className="status" style={[this.styles.inlineBlocks, this.styles.flexFixed]}>kernel spec</div>
      </div>
    )
  }
}

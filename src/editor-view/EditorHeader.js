/** Created by ge on 3/23/16. */
/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import Tag from "./Tag";
import Input from "./Input";

@Radium
export default class EditorHeader extends React.Component {
  static propTypes = {
    style: React.PropTypes.any.isRequired
  };

  styles = {
    header: {
      position: "relative",
      left: 0,
      right: 0,
      height: "50px"
    },
    child: {
      fontSize: "12px",
      height: "20px",
      padding: "7px",
      marginRight: "10px"
    }
  };


  constructor() {
    super();
  }

  render() {
    return (
      <div className="editor-header" style={[this.props.style, this.styles.header]}>
        <Tag className="tag" style={this.styles.child}>update this</Tag>
        <Tag className="tag" style={this.styles.child}>escherpad</Tag>
        <Tag className="tag" style={this.styles.child}>escherpad</Tag>
        <Input style={this.styles.child}/>
      </div>
    )
  }
}



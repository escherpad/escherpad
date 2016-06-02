/** Created by ge on 3/23/16. */
import React from 'react';
import Radium from 'radium';

@Radium
export default class Tag extends React.Component {
  static propTypes = {
    height: React.PropTypes.string,
    fontSize: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    radius: React.PropTypes.string,
    button: React.PropTypes.node,
    onDelete: React.PropTypes.func,
    onClick: React.PropTypes.func
    //style: React.PropTypes.any.isRequired
  };

  static defaultProps = {
    radius: "4px",
    height: "15px",
  };

  styles = {};

  constructor() {
    super();
  }

  render() {
    this.styles = {
      tag: {
        display: "inline-block",
        height: `${this.props.style.height || this.props.height}`,
        lineHeight: `${this.props.style.height || this.props.height}`,
        color: "white",
        backgroundColor: "#23aaff",
        borderRadius: `${this.props.style.radius || this.props.radius}`,
        padding: `0 0 0 ${this.props.style.padding}`,
      },
      button: {
        cursor: "hand",
        cursor: "pointer",
        padding: `0 ${this.props.style.padding}`,
        display: "inline-block",
      }
    };
    return (
      <div className="tag" style={[this.props.style, this.styles.tag]}>
        {this.props.children}
        <div className="button" style={this.styles.button}>{this.props.button || "×"}</div>
      </div>
    )
  }
}




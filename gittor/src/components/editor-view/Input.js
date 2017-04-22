/** Created by ge on 3/23/16. */
import React from 'react';
import Radium from 'radium';

@Radium
export default class Input extends React.Component {
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
    outline: "none",
    radius: "4px",
    height: "15px"
  };

  styles = {};

  constructor() {
    super();
  }

  render() {
    this.styles = {
      input : {
        display: "inline-block",
        height: `${this.props.style.height || this.props.height}`,
        lineHeight: `${this.props.style.height || this.props.height}`,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0)",
        border: "0px solid rgba(255, 255, 255, 0.5)",
        borderRadius: `${this.props.style.radius || this.props.radius}`,
        padding: `0 0 0 ${this.props.style.padding}`,
      },
      button: {
        padding: `0 ${this.props.style.padding}`,
        display: "inline-block",
      }
    };
    return (
      <input style={this.styles.input} placeholder={this.props.placeholder}/>
    )
  }
}




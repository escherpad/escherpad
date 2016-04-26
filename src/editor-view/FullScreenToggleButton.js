/** Created by ge on 4/25/16. */
import React from "react";
import Radium from "radium";
import FlexItem from "../layout/FlexItem";

const style = {
  color: "#cfcfcf",
  fontSize: "40px",
  transition: "all 0.3s linear",
  ":hover": {
    color: "#23aaff",
    textShadow: "0 0 3px #23aaff"
  },
  ":focus": {
    color: "#23aaff",
    textShadow: "0 0 3px #23aaff"
  }
};
var {bool} = React.PropTypes;
@Radium
export default class FullScreenToggleButton extends React.Component {
  static PropTypes = {
    value: bool
  };

  onMouseEnter() {
    this.setState({mouseOver: true})
  }

  onMouseLeave() {
    this.setState({mouseOver: false})
  }

  onClick() {
  }

  render() {
    let value = this.props.value;
    let mouseOver = this.state ? this.state.mouseOver : false;
    let icon = (value ^ mouseOver) ?
      (<i className="material-icons" style={style}>fullscreen</i>) :
      (<i className="material-icons" style={style}>fullscreen_exit</i>);
    return (
      <FlexItem fixed style={{"padding": "0 4px", "cursor":"pointer", "height":"40px"}}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                onClick={this.onClick.bind(this)}
      >{icon}</FlexItem>
    )
  }
}

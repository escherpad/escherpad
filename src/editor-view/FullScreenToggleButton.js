/** Created by ge on 4/25/16. */
import React from "react";
import MouseOver from "../mouseover/MouseOver";
import If from "../if/If";
import FlexItem from "../layout/FlexItem";

const style = {
  color: "#cfcfcf",
  fontSize: "40px",
  transition: "all 0.3s linear"
};
const hover = {
  color: "#23aaff",
  fontSize: "40px",
  transition: "all 0.3s linear",
  textShadow: "0 0 3px #23aaff"
};

var {bool} = React.PropTypes;
export default class FullScreenToggleButton extends React.Component {
  static PropTypes = {
    value: bool
  };

  onClick() {
  }

  render() {
    let value = this.props.value;
    return (
      <FlexItem fixed style={{"padding": "0 4px", "cursor":"pointer", "height":"40px"}}
                onClick={this.onClick.bind(this)}
      ><If data={value}>
        <MouseOver value={true}>
          <i ref="default" className="material-icons" style={style}>fullscreen</i>
          <i ref="hover" className="material-icons" style={hover}>fullscreen_exit</i>
        </MouseOver>
        <MouseOver default>
          <i ref="default" className="material-icons" style={style}>fullscreen_exit</i>
          <i ref="hover" className="material-icons" style={hover}>fullscreen</i>
        </MouseOver>
      </If>
      </FlexItem>
    )
  }
}

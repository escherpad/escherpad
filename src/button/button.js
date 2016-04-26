/** Created by ge on 4/25/16. */
import React from "react";
import Radium from "radium";

function getStyle({
  color = "white",
  backgroundColor = "#23aaff",
  textShadow,
  hoverColor,
  hoverBackground = "#23aaff",
  hoverTextShadow,
  activeColor,
  activeBackground,
  padding = "0 12px",
  radius = "7px",
  height = "32px",
  fontSize = "14px"
}={}) {
  "use strict";
  var defaultStyle = {
    color: color,
    backgroundColor: backgroundColor,
    textShadow: textShadow || `0 0 2px ${color}`,
    borderRadius: radius,
    height: height,
    lineHeight: height,
    fontSize: fontSize,
    margin: 0,
    border: "none",
    cursor: "pointer",
    padding: padding,
    transition: "all 0.15s linear",

    ":hover": {
      color: hoverColor || color,
      backgroundColor: hoverBackground,
      outline: "none"
    },
    ":active": {
      color: activeColor || hoverColor || color,
      backgroundColor: activeBackground || hoverBackground || backgroundColor,
      outline: "none"
    },
    ":focus" : {
      outline: "none"
    }


  };
  return defaultStyle;
}
var {any} = React.PropTypes;
@Radium
export default class Button extends React.Component {
  static propTypes = {
    backgroundColor: any
  };

  render() {
    var {color, backgroundColor, textShadow, padding, hoverColor, hoverBackground, hoverTextShadow, activeColor, activeBackground, height, radius, fontSize, ...props} = this.props;
    var style = getStyle({
      color,
      backgroundColor,
      textShadow,
      padding,
      hoverColor,
      hoverBackground,
      hoverTextShadow,
      activeColor,
      activeBackground,
      height,
      radius,
      fontSize
    });
    if (this.props.flexFluid) style.flex = "1 1 auto";
    if (this.props.flexFixed) style.flex = "0 0 auto";

    return (
      <button style={style} {...props}>{this.props.children}</button>
    )
  }
}

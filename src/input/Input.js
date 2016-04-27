/** Created by ge on 4/26/16. */
import React from "react";
require('./search-input.scss');
export default class Input extends React.Component {
  render() {
    var {value, placeholder="type...", style, height=30, fontSize="14", padding="7", ...props} = this.props;
    var finalStyle = {
      ...style,
      height: height + "px",
      lineHeight: `${height - 2}px`,
      borderRadius: `${height / 2}px`,
      fontSize: `${fontSize}px`,
      padding: `0 ${padding}px`,
      paddingLeft: `${height - 4}px`
    };
    var iconStyle = {
      height: height + "px",
      width: (height + 2) + "px",
      lineHeight: `${height}px`,
      fontSize: `${fontSize * 1.25}px`
    };
    return (
      <div className="search-input">
        <i className="material-icons search-icon" style={iconStyle}>search</i>
        <input style={finalStyle} placeholder={placeholder} {...props}/>
      </div>
    )
  }
}

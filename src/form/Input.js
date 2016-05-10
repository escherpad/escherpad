/** Created by ge on 5/9/16.
 * `type` prop can be a parsing function.
 * */
import React, {Component, PropTypes} from "react";

var {string, func, object, any, oneOfType} = PropTypes
export default class Input extends Component {
  static PropTypes = {
    value: any,
    type: oneOfType([string, func]),
  };

  onChange(e) {
    var {type, onChange} = this.props;
    var value = e.target.value;
    if (type === "number") value = parseFloat(value);
    else if (typeof type === "function") value = type(value);
    if (onChange) return onChange(value);
  };

  render() {
    var {onChange, ...props} = this.props;
    return (
      <input {...props} onChange={this.onChange.bind(this)}/>
    )
  }
}

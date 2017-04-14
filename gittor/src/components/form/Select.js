/** Created by ge on 5/9/16.
 * `type` prop can be a parsing function.
 * */
import React, {Component, PropTypes} from "react";

var {string, func, object, any, oneOfType} = PropTypes
export default class Select extends Component {
  static propTypes = {
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
    var {onChange, children, ...props} = this.props;
    return (
      <select {...props} onChange={this.onChange.bind(this)}>
        {children}
      </select>
    )
  }
}

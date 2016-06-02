/** Created by ge on 5/9/16.
 * `type` prop can be a parsing function.
 * */
import React, {Component, PropTypes} from "react";

var {string, func, object, any, oneOfType} = PropTypes;
export default class Input extends Component {
  static propTypes = {
    value: any,
    type: oneOfType([string, func]),
  };

  componentWillMount() {
    var {value} = this.props;
    this.setState({value});
  }

  componentWillReceiveProps(newProps) {
    var {value, type} = newProps;
    // console.log('now compare current value vs new value', [this.parse(this.viewValue, this.props.type), value]);
    if (this.parse(this.viewValue, this.props.type) !== value)
      this.setViewState(value);
  }
  setViewState(value) {
    this.viewValue = value;
    this.setState({value});
  }

  parse(value, _type) {
    var type = (!!_type) ? _type : this.props.type;
    if (type === "number") value = parseFloat(value);
    else if (typeof type === "function") value = type(value);
    return value;
  }

  onChange(e) {
    var {onChange} = this.props;
    var value = e.target.value;
    this.setViewState(value);
    if (onChange) return onChange(this.parse(value));
  };

  render() {
    var {value} = this.state;
    var {onChange, ...props} = this.props;
    return (
      <input {...props} value={value} onChange={this.onChange.bind(this)}/>
    )
  }
}

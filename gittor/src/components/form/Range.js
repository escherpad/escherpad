/** Created by ge on 4/25/16. */
import React from "react";
import {autobind} from "core-decorators";

const {any, func} = React.PropTypes;

export default class Range extends React.Component {
  //notice: not sure what the value is doing here.

  static propTypes = {
    value: any,
    min: any,
    max: any,
    onChange: func,
    valueToRange: func,
    rangeToValue: func
  };

  static defaultProps = {
    min: 0,
    max: 100,
    valueToRange: (n) => n,
    rangeToValue: (n) => n
  };

  componentWillMount() {
    const {value, min, max, valueToRange} = this.props;
    if (typeof valueToRange === "function") {
      this.value = this.props.valueToRange(value);
      this.setState({
        value: valueToRange(value),
        min: valueToRange(min),
        max: valueToRange(max)
      });
    } else if (typeof Math[valueToRange] === "function") {
      this.setState({
        value: Math[valueToRange](value),
        min: Math[valueToRange](min),
        max: Math[valueToRange](max)
      });
    } else this.setState({value, min, max});
  }

  componentWillReceiveProps({value, min, max, valueToRange}) {
    if (value !== this.props.value) {
      if (typeof valueToRange === "function") this.setState({value: valueToRange(value)});
      else if (typeof Math[valueToRange] === "function") this.setState({value: Math[valueToRange](value)});
      else this.setState({value});
    }

    if (min !== this.props.min) {
      if (typeof valueToRange === "function") this.setState({min: valueToRange(min)});
      else this.setState({min});
    }

    if (max !== this.props.max) {
      if (typeof valueToRange === "function") this.setState({max: valueToRange(max)});
      else this.setState({max});
    }
  }

  //todo: add onMouseUp and TouchEnd event handlers
  @autobind
  onChange(e) {
    if (typeof this.props.rangeToValue === "function")
      this.value = this.props.rangeToValue(e.target.value);
    else if (typeof Math[this.props.rangeToValue] === 'function')
      this.value = Math[this.props.rangeToValue](e.target.value);
    else this.value = e.target.value;
    this.setState({value: this.value});
    if (this.props.onChange) this.props.onChange(this.value);
  }

  render() {
    const {value, min, max, valueToRange, rangeToValue, onChange, ..._props} = this.props;
    console.log(this.state.value);
    return (
      <input type="range"
             onChange={this.onChange}
             {...{...this.state, ..._props}}/>
    )
  }
}

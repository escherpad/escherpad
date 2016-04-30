/** Created by ge on 4/24/16. */
import React from 'react';
import ReactDOM from "react-dom";

import {flexFluid, flexFixed} from "./style-globals";

const styles = {};

var {any} = React.PropTypes;
export default class FlexItem extends React.Component {
  static propTypes = {
    fluid: any,
    fixed: any,
    width: any,
    style: any,
    children: any
  };

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this.refs["DIV"]);
    var {width} = this.props;
    if (width) this.setWidth(width);
  }

  componentWillReceiveProps(newProps) {
    var {width} = newProps;
    if (width) this.setWidth(width);
  }

  componentWillUnmount() {
  }

  setWidth(width) {
    this.container.style.width = width;
  }

  render() {
    var flexStyle;
    var {style = {}, fluid, fixed, width, children = [], ...props} = this.props;
    if (fluid) flexStyle = flexFluid;
    if (fixed) flexStyle = flexFixed;
    return (
      <div {...this.props}
        ref="DIV"
        style={{...flexStyle, ...style, width}}
        {...props}>
        {children}
      </div>
    )
  }
}

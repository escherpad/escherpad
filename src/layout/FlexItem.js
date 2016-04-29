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
    this.container = ReactDOM.findDOMNode(this.DIV);
    var {width} =this.props;
    if (width) this.setWidth(width);
  }

  componentWillReceiveProps(newProps) {
    var {width} = newProps;
    if (width) this.setWidth(width);
  }

  setWidth(width) {
    this.container.style.width = width;
  }

  render() {
    var flexStyle;
    var {style = {}, fluid, fixed, width, children = []} = this.props;
    if (fluid) flexStyle = flexFluid;
    if (fixed) flexStyle = {...flexFixed, width};
    return (
      <div {...this.props}
        ref={(_)=>this.DIV=_}
        style={{...flexStyle, ...style}}>
        {children}
      </div>
    )
  }
}

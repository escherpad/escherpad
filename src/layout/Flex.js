/** Created by ge on 4/24/16. */
import React from 'react';
import Radium from 'radium';

import {flexRow, flexColumn, flexFluid, flexFixed} from "./style-globals";

const styles = {};

export default class Flex extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    var thisStyle;
    if (this.props.column) thisStyle = flexColumn;
    if (this.props.row) thisStyle = flexRow;
    if (this.props.fill) thisStyle = {
      ...thisStyle,
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0
    };
    if (this.props.align) thisStyle.alignItems = this.props.align;
    let style = this.props.style;
    let children = this.props.children || [];
    return (
      <div {...this.props} style={{...thisStyle, ...style}}>
        {children}
      </div>
    )
  }
}

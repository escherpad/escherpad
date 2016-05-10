/** Created by ge on 4/24/16. */
import React, {Component, PropTypes, createElement} from 'react';

import {flexRow, flexColumn, flexFluid, flexFixed} from "./style-globals";

export default class Flex extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    var {tagName="div", style, row, column, fill, children = [], ...props} = this.props;
    var thisStyle;
    if (column) thisStyle = flexColumn;
    if (row) thisStyle = flexRow;
    if (fill) thisStyle = {
      ...thisStyle,
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0
    };
    if (this.props.align) thisStyle.alignItems = this.props.align;
    return createElement(tagName, {...props, style: {...thisStyle, ...style}}, children);
  }
}

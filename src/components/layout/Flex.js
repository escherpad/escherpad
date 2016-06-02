/** Created by ge on 4/24/16. */
import {createElement} from 'react';

import {flexRow, flexColumn, flexFluid, flexFixed} from "./style-globals";

export default function Flex(_props) {
  var {tagName="div", style, row, column, fill, align, children = [], ...props} = _props;
  var thisStyle;
  if (column) thisStyle = flexColumn;
  if (row) thisStyle = flexRow;
  if (fill) thisStyle = {
    ...thisStyle,
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0
  };
  if (align) thisStyle.alignItems = align;
  return createElement(tagName, {...props, style: {...thisStyle, ...style}}, children);
}

/** Created by ge on 5/30/16. */
import {cloneElement} from "react";
export default function Height (_props) {
  "use strict";
  var {children=null, style, height, ...props} = _props;
  const _style = {};
  if (height) {
    _style.height = height;
    _style.lineHeight = height;
  }
  return cloneElement(children, {style: {..._style, ...style}})
}

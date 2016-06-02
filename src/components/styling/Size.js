/** Created by ge on 5/30/16. */
import {cloneElement} from "react";
export default function Size (_props) {
  "use strict";
  var {children=null, style, size, ...props} = _props;
  const _style = {fontSize: size};
  return cloneElement(children, {style: {..._style, ...style}})
}

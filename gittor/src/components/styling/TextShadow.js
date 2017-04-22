/** Created by ge on 5/30/16. */
import {cloneElement} from "react";
export default function TextShadow (_props) {
  "use strict";
  var {children=null, style, color, ...props} = _props;
  const _style = {
    color,
    textShadow: `0 0 1px ${color}`
  };
  return cloneElement(children, {style: {..._style, ...style}})
}

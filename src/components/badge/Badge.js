/** Created by ge on 5/15/16. */
import React from "react";

require('./badge.scss');
export default function BadgeWithControl({className="", children, text, ..._props}) {
  if (className) className += " badge";
  else className = "badge";
  if (_props.onClick) className += " clickable";
  return (
    <div className={className} {..._props}>
      {(text || children)}
    </div>
  )
}

/** Created by ge on 5/15/16. */
import React from "react";

require('./badge.scss');
export default function BadgeWithControl({className, icon, children, text, onIconClick, ...props}) {
  return (
    <div className={"badge badge-with-control " + (className || "") } {...props}>
      {(text || children)}
      {(icon || (<i className="material-icons" onClick={onIconClick}></i>))}
    </div>
  )
}

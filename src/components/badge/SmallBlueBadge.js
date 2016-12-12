/** Created by ge on 5/15/16. */
import React from "react";
import Badge from "./Badge";

require('./small-blue-badge.scss');
export default function SmallBlueBadge({className, ..._props}) {
  "use strict";
  return <Badge className={`small-blue-badge ${className}`} {..._props}/>
}

/** Created by ge on 5/15/16. */
import React from "react";
import Badge from "./Badge";

require('./blue-badge.scss');
export default function BlueBadge({className, ..._props}) {
  return <Badge className={`small-blue-badge ${className}`} {..._props}/>
}

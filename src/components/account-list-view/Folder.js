/** Created by ge on 12/7/16. */
import React from "react";
export default function FolderEntry(props) {
  "use strict";
  let {title, meta, onClick} = props;
  return <div className="list-item" onClick={onClick}>
    <i className="material-icons">folder</i>
    <span className="item-title">{title}</span>
    <div className="item-meta">{meta}</div>
  </div>
}

/** Created by ge on 12/7/16. */
import React from "react";
export default function FolderEntry(props) {
  "use strict";
  let {title, meta, onClick} = props;
  return <div className="list-item" onTouchStart={onClick} onMouseDown={onClick}>
    <i className="material-icons">insert_drive_file</i>
    <span className="item-title">{title}</span>
    <div className="item-meta">{meta}</div>
  </div>
}

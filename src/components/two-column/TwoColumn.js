import React from "react";
import {Row, Width} from 'layout-components';

require('./two-column.scss');
export default function TwoColumn({className, col1, col2, ..._props}) {
  if (className) className += " two-column";
  else className = "two-column";
  if (_props.onClick) className += " clickable";
  return (
    <Row tagName="div" className={className} {..._props}>
      <Width width="40%" tagName="div" style={{textAlign: "right"}}>
        {col1}
      </Width>
      <Width width="60%" tagName="div">
        {col2}
      </Width>
    </Row>
  );
}

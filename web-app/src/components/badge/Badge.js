/** Created by ge on 5/15/16. */
import React from "react";
import styled from "styled-components";

const height = "20px";
const fontSize  = "12px";
const Styled = styled("span")`
    position: relative;
    display: inline-block;
    border-radius: 4px;
    font-size: ${fontSize};
    line-height: ${height};
    padding: 0 7px;
    top: -1px;
    &.clickable, &.badge-with-control {
        cursor: pointer;
    }

`;
export default function BadgeWithControl({className="", children, text, ..._props}) {
  if (className) className += " badge";
  else className = "badge";
  if (_props.onClick) className += " clickable";
  return (
    <Styled className={className} {..._props}>
      {(text || children)}
    </Styled>
  )
}

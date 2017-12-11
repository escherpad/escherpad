/** Created by ge on 5/15/16. */
import React from "react";
import Badge from "./Badge";
import styled from "styled-components";

const height= "16px";
const color= "#23aaff";
const Styled = styled(Badge)`
// Created by ge on 12/11/16.
    box-sizing: border-box;
    font-size: 10px;
    line-height: ${height} - 2px;
    height: ${height};
    border-radius: 6px;
    padding: 0 4px 0 4px;
    cursor: pointer;
    transition: all 0.05s linear;

    color: white;
    //text-shadow: 0 0 1px #007ee5;
    background-color: fade_out(${color}, 0);
    &:hover {
        color: white;
        background-color: ${color};
    }
    &:active {
        background-color: darken(${color}, 10%);
    }
    // standard
    border: 0 solid rgba(white, 0);

`;

export default function SmallBlueBadge({className, ..._props}) {
  return <Styled className={`small-blue-badge ${className}`} {..._props}/>
}

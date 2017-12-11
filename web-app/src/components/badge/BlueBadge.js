/** Created by ge on 5/15/16. */
import React from "react";
import Badge from "./Badge";
import styled from "styled-components";

const height= "16px";
const color= "#23aaff";
const Styled = styled(Badge)`
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
    border: 0px solid rgba(white, 0);
`;

function BlueBadge({className, ..._props}) {
    return <Styled className={`small-blue-badge ${className}`} {..._props}/>
}

export default BlueBadge;

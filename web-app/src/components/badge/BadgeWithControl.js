/** Created by ge on 5/15/16. */
import React from "react";
import Badge from "./Badge";
import styled from "styled-components";

const height = "20px";
const fontSize = "12px";
const Styled = styled(Badge)`
        padding-right: ${height};
        :last-child {
            position: absolute;
            top: 0;  right: 0;
            width: ${height};
            margin: 0 auto;
            font-size: ${fontSize};
            line-height: ${height};
            text-align: center;
        }
`;

/**
 * The easiest way to style the component is by tagging it with CSS class.
 * */
function BadgeWithControl({className, icon, children, text, onIconClick, ...props}) {
    return (
        <Styled className={"badge badge-with-control " + (className || "")} {...props}>
            {(text || children)}
            {(icon || (<i className="material-icons" onClick={onIconClick}/>))}
        </Styled>
    )
}

export default BadgeWithControl;

import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {GoChevronLeft, GoTriangleDown, GoTriangleRight} from "react-icons/lib/go/index";

const Styled = styled(Flex)`
  border-bottom: solid 0.5px #c5c5c5;
`;
const StyledButton = styled("button")`
    font-size: 1em;
    cursor: pointer;
    border: solid 1px transparent;
    background-color: transparent;
    flex: 0 0;
    display: flex; 
    flex-direction: row;
    align-items: center;
    > svg {
      margin-left: 0.2em;
      color: #5d5d5d;
    }
    &:focus {
      outline: none;
    }
    &:hover, &:active {
    color: #23aaff;
    text-shadow: 0 0 0.5px #23aaff;
        > svg {
          color: #23aaff;
          filter: drop-shadow(0 0 3px #23aaff);
        }
    }
`;
export default function ListTabs(props) {
    return (
        <Styled fill row {...props}>
            <StyledButton>
                <FlexItem>yours</FlexItem><FlexItem component={GoTriangleDown}/>
            </StyledButton>
            <FlexSpacer/>
            <StyledButton>
                <FlexItem>recent</FlexItem><FlexItem component={GoTriangleDown}/>
            </StyledButton>
        </Styled>
    );
}

import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {GoChevronLeft, GoPlus} from "react-icons/lib/go/index";

const Styled = styled('button')`
  color: #cfcfcf;
  background-color: transparent;
  border: solid 1px transparent;
  border-radius: 4em;
  cursor: pointer;
  :hover, :active {
    color: #23aaff;
    svg {
      filter: drop-shadow(0 0 4px #23aaff);
    }
  }
  svg {
    width: 4em;
    height: 4em;
  }
`;

function ListLeftButton(props) {
    return (
        <Styled {...props}>
            <GoChevronLeft/>
        </Styled>
    );
}

function ListRightButton(props) {
    return (
        <Styled {...props}>
            <GoPlus/>
        </Styled>
    );
}

const HeroSyle = styled('h1')`
  font-size: 3em;
  text-align: center;
  margin: 0;
  //margin: 0.7em 0 0.2em;
`;
function ListHero(props) {
    return (
        <HeroSyle {...props}>
            Notes
        </HeroSyle>
    );
}

export {
    ListLeftButton,
    ListRightButton,
    ListHero
}

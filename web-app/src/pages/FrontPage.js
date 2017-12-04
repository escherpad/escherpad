import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {Helmet} from "react-helmet";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    background-color: #efefef
`;
const HeaderButton = styled(FlexItem)`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    > span {
        color: black;
        flex: 0 0 auto;
        margin: 0 13px;
        font-size: 15px;
        padding: 4px 2px;
        border-top: solid 4px transparent;
        border-bottom: solid 4px transparent;
    }
    :hover > span {
        border-bottom: solid 4px black;
    }
`;
export default function FrontPage(props) {
    const listSections = [];
    return (
        <Styled fill column style={{backgroundImage: "linear-gradient(-40deg, #FF008C, #E1FF00)"}}>
            <Helmet>
                <title>Welcome to Escherpad</title>
            </Helmet>
            <FlexItem fixed component={Flex} row align="stretch" height={70}
                      style={{backgroundColor: 'transparent', padding: "0 100px", maxWidth: "1000px"}}>
                <HeaderButton component="a" style={{fontSize: "19px"}}>Escherpad</HeaderButton>
                <FlexSpacer/>
                <HeaderButton component="a" href="/editor"><span>Editor</span></HeaderButton>
                <HeaderButton component="a" href="/todo"><span>Todo List</span></HeaderButton>
            </FlexItem>
        </Styled>
    );
}

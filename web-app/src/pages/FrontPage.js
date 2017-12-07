import React from "react";
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
        <Styled fill column style={{backgroundImage: "linear-gradient(-40deg, #FF008C, #E1FF00)"}} align="stretch">
            <Helmet>
                <title>Welcome to Escherpad</title>
            </Helmet>
            <FlexItem fixed>
                <Flex row style={{
                    height: "70px", padding: "0 40px", maxWidth: "1000px", left: 0, right: 0,
                    margin: "0 auto"
                }}>
                    <HeaderButton component="a"><span style={{fontSize: "19px"}}>Escherpad</span></HeaderButton>
                    <FlexSpacer/>
                    <HeaderButton component="a" href="/findr"><span>Findr</span></HeaderButton>
                    <HeaderButton component="a" href="/notes"><span>Notes</span></HeaderButton>
                    <HeaderButton component="a" href="/todo"><span>Todo List</span></HeaderButton>
                </Flex>
            </FlexItem>
        </Styled>
    );
}

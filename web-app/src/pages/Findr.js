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
    text-decoration: none;
    cursor: pointer;
    > span {
        color: white;
        flex: 0 0 auto;
        margin: 0 13px;
        font-size: 15px;
        padding: 4px 2px;
        border-top: solid 4px transparent;
        border-bottom: solid 4px transparent;
    }
    :hover > span {
        border-bottom: solid 4px white;
    }
`;
export default function Findr(props) {
    const listSections = [];
    return (
        <Styled fill column style={{backgroundImage: "linear-gradient(140deg, #006EFF, #00FFD5)"}} align="stretch">
            <Helmet>
                <title>Welcome to Escherpad</title>
            </Helmet>
            <FlexItem fixed>
                <Flex row style={{
                    height: "70px", padding: "0 40px", maxWidth: "1000px", left: 0, right: 0,
                    margin: "0 auto"
                }}>
                    <HeaderButton component="a"><span style={{fontSize: "19px"}}>Findr</span></HeaderButton>
                    <FlexSpacer/>
                    <HeaderButton component="a" href="settings"><span>settings</span></HeaderButton>
                </Flex>
            </FlexItem>
            <FlexSpacer/>
            <FlexItem fixed>
                <Flex row align="stretch" style={{
                    height: "43px", padding: "0 40px", maxWidth: "1000px", left: 0, right: 0,
                    margin: "0 auto"
                }}>
                    <FlexItem component="input" fluid type="Text"
                              style={{
                                  borderRadius: "14px", border: "solid 1px transparent",
                                  marginRight: "10px",
                                  padding: "0 14px",
                                  color: "#4198ED",
                                  fontSize: "1em"
                              }}/>
                    <FlexItem component="button" href="settings" style={{
                        cursor: "pointer",
                        backgroundColor: "transparent", fontSize: "1em",
                        textDecoration: "none", color: "white", padding: "0 15px", lineHeight: "40px",
                        border: "solid 1px white", borderRadius: "10px",
                        marginLeft: "10px"
                    }}>find</FlexItem>
                </Flex>
            </FlexItem>
            <FlexSpacer/>
            <FlexSpacer/>
        </Styled>
    );
}

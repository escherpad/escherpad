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
    > span {
        flex: 0 0 auto;
        margin: 0 13px;
        font-size: 15px;
        padding: 4px 2;
        border-top: solid 3px transparent;
        border-bottom: solid 3px transparent;
    }
    :hover > span {
        border-bottom: solid 3px #23aaff
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
                      style={{backgroundColor: 'transparent', padding: "0 400px"}}>
                <HeaderButton style={{fontSize: "19px"}}>Escherpad</HeaderButton>
                <FlexSpacer/>
                <HeaderButton><span>Beta</span></HeaderButton>
                <HeaderButton><span>Sign In</span></HeaderButton>
                <HeaderButton><span>Your Teams</span></HeaderButton>
            </FlexItem>
        </Styled>
    );
}

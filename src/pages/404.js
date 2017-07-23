import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    background-color: #23aaff;
    
    * {
        color: white;
        text-align: center;
    }
     h1 {
        font-size: 120px;
        margin: 0;
    }
     h2 {
        font-size: 24px;
    }
     p {
        font-size: 20px;
    }
`;
export default function NoMatch(props) {
    return (
        <Styled fill column {...props}>
            <FlexSpacer/>
            <FlexItem fixed component={Fade} duration={1.5}>
                <h1>404</h1>
                <h2>Welcome To The No-man Land!</h2>
                <p>This address does not exist</p>
            </FlexItem>
            <FlexSpacer/>
        </Styled>
    );
}

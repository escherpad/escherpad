import React from "react";
import {Flex, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    background-color: #23aaff;
    
    > * {
        color: white;
        text-align: center;
    }
    > h1 {
        font-size: 120px;
        margin: 0;
    }
    > h2 {
        font-size: 24px;
    }
    > p {
        font-size: 20px;
    }
`;
export default function NoMatch(props) {
    return (
        <Styled fill column {...props}>
            <FlexSpacer/>
            <h1>404</h1>
            <h2>Welcome To The No-man Land!</h2>
            <p>This address does not exist</p>
            <FlexSpacer/>
        </Styled>
    );
}

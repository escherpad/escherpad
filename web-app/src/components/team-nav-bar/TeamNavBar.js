import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    background-color: purple;
    font-family: 'Lato', sans-serif;
    width: 80px;
`;
export default function TeamNavBar(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed/>
        </Styled>
    );
}

import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    width: 80px;
    background-image: linear-gradient(-40deg, #FF008C, #E1FF00);
`;
export default function TeamNavBar(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed/>
        </Styled>
    );
}

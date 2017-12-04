import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function ListTabs(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed>list tabs</FlexItem>
        </Styled>
    );
}

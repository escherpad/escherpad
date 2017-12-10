import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
`;
export default function EditorHeader(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed>
                editor header
            </FlexItem>
        </Styled>
    );
}

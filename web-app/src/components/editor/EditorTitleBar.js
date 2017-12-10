import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
`;
export default function EditorTitleBar(props) {
    return (
        <Styled fill row {...props}>
            <FlexItem fixed>
                Editor Title Bar
            </FlexItem>
        </Styled>
    );
}

import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

// dev only
import JSONPretty from 'react-json-pretty';
import EditorLayout from "../components/editor-layout/EditorLayout";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function Escherpad(props) {
    return (
        <Styled fill column>
            <EditorLayout />
        </Styled>
    );
}

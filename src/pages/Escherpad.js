import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

// dev only
import JSONPretty from 'react-json-pretty';

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function Escherpad(props) {
    return (
        <Styled fill column>
            <JSONPretty json={props}/>
        </Styled>
    );
}

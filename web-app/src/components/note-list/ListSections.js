import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)``;
export default function ListSections(props) {
    return (
        <Styled fill row {...props}>
            <div>hahaha</div>
            <div>hahaha</div>
            <div>hahaha</div>
            <div>hahaha</div>
            <div>hahaha</div>
            <div>hahaha</div>
        </Styled>
    );
}

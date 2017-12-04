import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function EditorLayout(props) {
    const {
        teamNavBar,
        bindrBar,
        listHeader,
        listHero,
        listLeftButton,
        listRightButton,
        listTabs,
        listSections,
        editorHeader,
        editorTitleBar,
        editorBody,
        editorFooter,
        ..._props
    } = props;
    return (
        <Styled fill row {..._props}>
            <FlexItem fixed component={teamNavBar}/>
            <FlexItem fixed component={bindrBar}/>
            <FlexItem fixed component={Flex} column className="list-panel" style={{width: "400px"}}>
                <FlexItem fixed component={listHeader}/>
                <FlexItem fixed component={Flex} row>
                    <FlexItem fixed component={listLeftButton}/>
                    <FlexItem fluid component={listHero}/>
                    <FlexItem fixed component={listRightButton}/>
                </FlexItem>
                <FlexItem fixed component={listTabs}/>
                {listSections.map((section, i) => <FlexItem key={i} fixed component={section}/>)}
            </FlexItem>
            <FlexItem fixed component={Flex} column>
                <FlexItem fixed component={editorHeader}/>
                <FlexItem fixed component={editorTitleBar}/>
                <FlexItem fixed component={editorBody}/>
                <FlexItem fixed component={editorFooter}/>
            </FlexItem>
        </Styled>
    );
}

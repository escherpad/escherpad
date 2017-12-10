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
        listBody,
        editorHeader,
        editorTitleBar,
        editorBody,
        editorFooter,
        ..._props
    } = props;
    const layout = {
        teamNavBar: false,
        bindrBar: false,
        listPanel: true,
        editorPanel: true,
    };
    return (
        <Styled fill row {..._props}>
            {layout.teamNavBar && teamNavBar ? <FlexItem fixed component={teamNavBar}/> : null}
            {layout.bindrBar && bindrBar ? <FlexItem fixed component={bindrBar} style={{background: "grey"}}/> : null}
            {layout.listPanel
                ? <FlexItem fixed component={Flex} column className="list-panel" width="400px"
                            align="stretch" style={{background: "green"}}>
                    <FlexItem fixed component={listHeader}/>
                    <FlexItem fixed component={Flex} row>
                        <FlexItem fixed component={listLeftButton}/>
                        <FlexItem fluid component={listHero}/>
                        <FlexItem fixed component={listRightButton}/>
                    </FlexItem>
                    <FlexItem fixed component={listTabs}/>
                    <FlexItem fluid component={listBody} style={{overflowY: "auto"}}/>
                    {/*{listSections.map((section, i) => <FlexItem key={i} fixed component={section}/>)}*/}
                </FlexItem>
                : null}
            {layout.editorPanel
                ? <FlexItem fixed component={Flex} column>
                    <FlexItem fixed component={editorHeader}/>
                    <FlexItem fixed component={editorTitleBar}/>
                    <FlexItem fixed component={editorBody}/>
                    <FlexItem fixed component={editorFooter}/>
                </FlexItem>
                : null}
        </Styled>
    );
}

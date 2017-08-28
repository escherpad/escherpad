import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

// dev only
import JSONPretty from 'react-json-pretty';
import EditorLayout from "../components/editor-layout/EditorLayout";
import TeamNavBar from "../components/team-nav-bar/TeamNavBar";
import BindrBar from "../components/bindr-bar/BindrBar";
import ListHeader from "../components/list-header/ListHeader";
import ListLeftButton from "../components/list-left-button/ListLeftButton";
import ListHero from "../components/list-hero/ListHero";
import ListRightButton from "../components/list-right-button/ListRightButton";
import ListTabs from "../components/list-tabs/ListTabs";
import ListSections from "../components/list-sections/ListSections";
import EditorHeader from "../components/editor-header/EditorHeader";
import EditorTitleBar from "../components/editor-title-bar/EditorTitleBar";
import EditorBody from "../components/editor-body/EditorBody";
import EditorFooter from "../components/editor-footer/EditorFooter";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function Escherpad(props) {
    const listSections = [];
    return (
        <Styled fill column>
            <EditorLayout teamNavBar={TeamNavBar}
                          bindrBar={BindrBar}
                          listHeader={ListHeader}
                          listLeftButton={ListLeftButton}
                          listHero={ListHero}
                          listRightButton={ListRightButton}
                          listTabs={ListTabs}
                          listSections={listSections}
                          editorHeader={EditorHeader}
                          editorTitleBar={EditorTitleBar}
                          editorBody={EditorBody}
                          editorFooter={EditorFooter}/>
        </Styled>
    );
}

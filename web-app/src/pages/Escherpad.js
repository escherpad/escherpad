import React from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet";

import {Flex} from "layout-components";
import EditorLayout from "../apps/Escherpad/EditorLayout";
import TeamNavBar from "../components/team-nav-bar/TeamNavBar";
import BindrBar from "../components/bindr-bar/BindrBar";
import ListHeader from "../components/note-list/ListHeader";
import ListLeftButton from "../components/note-list/ListLeftButton";
import ListHero from "../components/note-list/ListHero";
import ListRightButton from "../components/note-list/ListRightButton";
import ListTabs from "../components/note-list/ListTabs";
import ListSections from "../components/note-list/ListSections";
import EditorHeader from "../components/editor/EditorHeader";
import EditorTitleBar from "../components/editor/EditorTitleBar";
import EditorBody from "../components/editor/EditorBody";
import EditorFooter from "../components/editor/EditorFooter";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
`;
export default function Escherpad(props) {
    const noteName = "E-MAML";
    return (
        <Styled fill column>
            <Helmet>
                <title>Escherpad | {noteName}</title>
            </Helmet>
            <EditorLayout teamNavBar={TeamNavBar}
                          bindrBar={BindrBar}
                          listHeader={ListHeader}
                          listLeftButton={ListLeftButton}
                          listHero={ListHero}
                          listRightButton={ListRightButton}
                          listTabs={ListTabs}
                          listBody={ListSections}
                          editorHeader={EditorHeader}
                          editorTitleBar={EditorTitleBar}
                          editorBody={EditorBody}
                          editorFooter={EditorFooter}/>
        </Styled>
    );
}

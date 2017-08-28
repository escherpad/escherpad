import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

// dev only

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    color: white;
    caret-color: white;
    *::placeholder {
        color: white;
    }
    *:active, *:focus {
        outline: none
    }
`;
export default function Escherpad(props) {
    const listSections = [];
    return (
        <Styled fill column style={{backgroundImage: "linear-gradient(-40deg, #FF008C, #E1FF00)"}}>
            {/*full width input element*/}
            <div style={{width: "800px", margin: "0 auto"}}>
                <input style={{
                    fontSize: '3em',
                    marginTop: '250px',
                    marginBottom: '25px',
                    border: "none",
                    borderBottom: "dashed 1px white",
                    backgroundColor: "transparent",
                    width: "100%"
                }}
                       placeholder="What needs to be done?"></input>
                <Flex row style={{fontSize: "1.25em"}}>
                    <FlexItem>All / Active / Completed</FlexItem>
                    <FlexSpacer/>
                    <FlexItem>Yours</FlexItem>
                </Flex>
                {/*Bread crumbs*/}
                {/*list view*/}
                <div className="list-box">
                    <h3>Escherpad</h3>
                    <p>[ ] Finish redux file system @Cha before August 24th.</p>
                    <p>[ ] @Ge finish deployment setup</p>
                    <p>[ ] @Ge finish messenger</p>
                </div>
            </div>
        </Styled>
    );
}

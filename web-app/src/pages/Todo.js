import React from "react";
import Fade from 'react-fade';
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

// dev only

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    color: white;
    // cursor: auto;
    input {
        color: white; // this updated the cursor color as well.
    }
    *:focus::placeholder, *:hover::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
    *::placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
    *:active, *:focus {
        outline: none
    }
`;
function Separator (){
    return <FlexItem style={{margin: "0 15px"}}>/</FlexItem>
}
export default function Escherpad(props) {
    const listSections = [];
    return (
        <Styled fill column style={{backgroundImage: "linear-gradient(-40deg, #9710D5, #FF6A1A)"}}>
            {/*full width input element*/}
            <div style={{width: "700px", margin: "0 auto"}}>
                <input style={{
                    fontSize: '2.5em',
                    fontWeight: '200',
                    marginTop: '250px',
                    marginBottom: '25px',
                    border: "none",
                    borderBottom: "dotted 1px rgba(255, 255, 255, 0.8)",
                    backgroundColor: "transparent",
                    width: "100%"
                }}
                       placeholder="What needs to be done?"/>
                <Flex row style={{fontSize: "1.25em", fontWeight: "300", marginBottom: "25px"}}>
                    <FlexItem>All</FlexItem>
                    <Separator/>
                    <FlexItem>Active</FlexItem>
                    <Separator/>
                    <FlexItem>Completed</FlexItem>
                    <FlexSpacer/>
                    <FlexItem>Everyone</FlexItem>
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

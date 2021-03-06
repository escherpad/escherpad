import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {Helmet} from "react-helmet";

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

function Separator() {
    return <FlexItem style={{margin: "0 15px"}}>/</FlexItem>
}

export default function Escherpad(props) {
    return (
        <Styled fill column style={{backgroundImage: "linear-gradient(-40deg, #9710D5, #FF6A1A)"}}>
            <Helmet><title>Todo List</title></Helmet>
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
                    <p>[ ] @cha redux file system</p>
                    <p>[ ] @cha add `https` support</p>
                    <p>[x] @ge fix page title (use helmet)</p>
                    <p>[x] @ge add dynamic layout to editor</p>
                    <h3 style={{marginTop: "2em"}}>Findr</h3>
                    <p>[x] @ge figure out what source to search for</p>
                    <p>[x] @ge figure out what add view-model for those</p>
                    <p>[x] @ge client-side only arxiv search?</p>
                    <p>[x] @ge figure out a way to save the results (as special markdown type under /Findr/query_name.fnd.md)</p>
                </div>
            </div>
        </Styled>
    );
}

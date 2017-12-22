import React, {Component} from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {search} from "../../lib/arxiv/index";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    background-color: #efefef
`;
const HeaderButton = styled(FlexItem)`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 1em;
      padding-left: 0.2em;
    }
    &:not(:last-child) {
      margin-right: 1em;
      padding-right: 0.2em;
    }
    > span {
        height: 2em;
        line-height: 2em;
        color: white;
        flex: 0 0 auto;
        border-top: solid 0.3em transparent;
        border-bottom: solid 0.3em transparent;
    }
    :hover > span {
        border-bottom: solid 0.3em white;
    }
`;

class Findr extends Component {
    constructor() {
        super();
        this.onSearch = this._onSearch.bind(this);

    }

    _onInput(e){
        const value = e.target.value;
        console.log(value)
    }
    _onSearch(query) {
        search();
    };

    render() {
        return (
            <Styled fill column style={{backgroundImage: "linear-gradient(140deg, #006EFF, #00FFD5)"}} align="stretch">
                <Helmet>
                    <title>Findr | Search For All Your Knowledge</title>
                </Helmet>
                <FlexItem fixed>
                    <Flex row style={{
                        height: "4em", padding: "0 1.3em", maxWidth: "1000px", left: 0, right: 0,
                        margin: "0 auto"
                    }}>
                        <HeaderButton component="a"><span style={{fontSize: "19px"}}>Findr</span></HeaderButton>
                        <FlexSpacer/>
                        <HeaderButton component="a" href="settings"><span>settings</span></HeaderButton>
                    </Flex>
                </FlexItem>
                <FlexItem fixed>
                    <Flex column align="center" style={{
                        fontFamily: "Lato",
                        color: "white",
                        padding: "0 1.3em", maxWidth: "1000px", left: 0, right: 0,
                        margin: "0 auto"
                    }}>
                        <h1 style={{fontWeight: "200", fontSize: "6em", marginBottom: "0.1em"}}>Findr</h1>
                        <h3 style={{fontWeight: "200", fontSize: "1.5em", marginTop: "0.1em", marginBottom: "1.3em"}}>
                            Search your knowledge
                        </h3>
                    </Flex>
                </FlexItem>
                <FlexItem fixed>
                    <Flex row align="stretch" style={{
                        height: "2.2em", padding: "0 1.3em", maxWidth: "700px", left: 0, right: 0,
                        margin: "0 auto"
                    }}>
                        <FlexItem component="input" fluid type="Text"
                                  style={{
                                      borderRadius: "1em", border: "solid 1px transparent",
                                      marginRight: "0.5em",
                                      padding: "0 0.7em",
                                      color: "#4198ED",
                                      fontSize: "1em"
                                  }}
                                  onInput={this._onInput.bind(this)}
                        />
                        <FlexItem component="button" href="settings" onClick={this.onSearch}
                                  style={{
                                      cursor: "pointer",
                                      backgroundColor: "rgba(0, 0, 0, 0.2)", fontSize: "1em",
                                      textDecoration: "none", color: "white", padding: "0 0.7em", lineHeight: "100%",
                                      border: "solid 1px transparent", borderRadius: "1em",
                                      marginLeft: "10px"
                                  }}>find</FlexItem>
                    </Flex>
                </FlexItem>
                <FlexSpacer/>
            </Styled>
        );
    }
}

export default Findr;

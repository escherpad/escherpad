import React, {Component} from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {Helmet} from "react-helmet";

const Styled = styled(Flex)`
    font-family: 'Lato', sans-serif;
    background-color: #efefef
`;
const HeaderButton = styled(FlexItem)`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    padding: 4px 0;
    &:not(:first-child) {
      margin-left: 13px;
      padding-left: 2px;
    }
    &:not(:last-child) {
      margin-right: 13px;
      padding-right: 2px;
    }
    > span {
        color: white;
        flex: 0 0 auto;
        font-size: 15px;
        border-top: solid 4px transparent;
        border-bottom: solid 4px transparent;
    }
    :hover > span {
        border-bottom: solid 4px white;
    }
`;

class Findr extends Component {
    onSearch = (query) => {
        console.log(query)
    };

    render() {
        const results = [
            //todo: define flow schema.
            {
                source: "google-scholar",
                title: "SGAN: An Alternative Training of Generative Adversarial Networks",
                authors: ["Tatjana Chavdarova", "François Fleuret"],
                date: "2017-12-06",
                arxiv_category: ["stat.ML", "cs.LG"]
            }
        ];
        console.log(results);
        return (
            <Styled fill column style={{backgroundImage: "linear-gradient(140deg, #006EFF, #00FFD5)"}} align="stretch">
                <Helmet>
                    <title>Findr | Search For All Your Knowledge</title>
                </Helmet>
                <FlexItem fixed>
                    <Flex row style={{
                        height: "70px", padding: "0 20px", maxWidth: "1000px", left: 0, right: 0,
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
                        padding: "0 20px", maxWidth: "1000px", left: 0, right: 0,
                        margin: "0 auto"
                    }}>
                        <h1 style={{fontWeight: "200", fontSize: "140px", marginBottom: "10px"}}>Findr</h1>
                        <h3 style={{fontWeight: "200", fontSize: "30px", marginTop: "10px", marginBottom: "60px"}}>
                            Search your own knowledge
                        </h3>
                    </Flex>
                </FlexItem>
                <FlexItem fixed>
                    <Flex row align="stretch" style={{
                        height: "43px", padding: "0 20px", maxWidth: "700px", left: 0, right: 0,
                        margin: "0 auto"
                    }}>
                        <FlexItem component="input" fluid type="Text"
                                  style={{
                                      borderRadius: "14px", border: "solid 1px transparent",
                                      marginRight: "10px",
                                      padding: "0 14px",
                                      color: "#4198ED",
                                      fontSize: "1em"
                                  }}/>
                        <FlexItem component="button" href="settings" onClick={this.onSearch}
                                  style={{
                                      cursor: "pointer",
                                      backgroundColor: "transparent", fontSize: "1em",
                                      textDecoration: "none", color: "white", padding: "0 15px", lineHeight: "40px",
                                      border: "solid 1px white", borderRadius: "10px",
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

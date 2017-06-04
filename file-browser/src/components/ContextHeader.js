import React from 'react';
import PropTypes from 'prop-types';
import {Flex, FlexItem} from "layout-components";

import './context-header.css';
import SelectContainer from "../packages/selector-container/SelectContainer";
class ContextHeader extends React.Component {
    static propTypes = {
        hero: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const props = this.props;
        return (
            <Flex row fill justify="stretch" className="context-header" style={props.style}>
                <FlexItem fixed width="50px" component="h1"
                          className="gutter"
                          style={{}}>&lt;back</FlexItem>
                <FlexItem fluid component="h1"
                          className={`hero${props.heroActive ? " hero-highlight" : ""}`}
                >{props.hero}</FlexItem>
                <FlexItem fixed width="50px" component="h1"
                          className="gutter"
                          style={{}}>🔍</FlexItem>
            </Flex>)
    }
}
export default  SelectContainer((state) => ({
    hero: state.view.hero
}), ContextHeader)

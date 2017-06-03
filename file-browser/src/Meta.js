import React from 'react';
// import PropTypes from 'prop-types';
import {Flex, FlexItem} from "layout-components";
import SearchInput from "./components/SearchInput";
import ContextHeader from "./components/ContextHeader";
import ListTab from "./components/ListTab";
import ListView from "./components/ListView";
import GenericFileItem from "./components/GenericFileItem";

export default class Meta extends React.Component {
    render() {
        return (
            <Flex column fill justify="stretch">
                <FlexItem fixed component={SearchInput}/>
                <FlexItem fixed component={ContextHeader}/>
                <FlexItem fixed component={ListTab}/>
                <FlexItem fluid component={ListView} itemComponent={GenericFileItem}/>
            </Flex>)
    }
}

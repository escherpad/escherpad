import React from 'react';
import PropTypes from 'prop-types';
import {Flex, FlexItem} from "layout-components";
import SearchInput from "./components/SearchInput";
import ContextHeader from "./components/ContextHeader";
import ListTab from "./components/ListTab";
import ListView from "./components/ListView";
import GenericFileItem from "./components/GenericFileItem";
import SelectContainer from "./packages/selector-container/SelectContainer";

class Meta extends React.Component {
    static propTypes = {
        store$: PropTypes.any
    };

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

const selector = (state) => {
    return {title: state.title};
};
export default SelectContainer(selector, Meta)

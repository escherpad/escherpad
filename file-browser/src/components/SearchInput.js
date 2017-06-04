import React from 'react';
import PropTypes from 'prop-types';
import SelectContainer from "../packages/selector-container/SelectContainer";
// import {Flex, FlexItem} from "layout-components";

class SearchInput extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    onInput(e) {
        this.props.dispatch({type: "UPDATE_SEARCH_QUERY", value: e.target.value});
    }

    clearInput() {
        this.props.dispatch({type: "CLEAR_SEARCH_QUERY"})
    }

    render() {
        const props = this.props;
        return (<div className="search-input" style={props.style}>
            <input ref="input" width="100%" height="100%" onInput={this.onInput.bind(this)} value={props.value}/>
            <button onClick={this.clearInput.bind(this)}>x</button>
        </div>)
    }
}

export default SelectContainer(
    (state) => ({value: state.view.searchQuery}),
    SearchInput
);
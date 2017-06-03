import React from 'react';
// import PropTypes from 'prop-types';
// import {Flex, FlexItem} from "layout-components";

export default class ListView extends React.Component {
    render() {
        const props = this.props;
        return (<div style={props.style}>ListView</div>)
    }
}

import React from "react";
import PropTypes from "prop-types";

import {Flex, FlexItem} from "layout-components";

export default class ContextView extends React.Component {
    static propTypes = {
        raViews: PropTypes.any.isRequired
    };

    render() {
        const {raViews} = this.props;
        const {FileListView} = raViews;
        return <Flex column className="context-view">context view
            <FlexItem fixed height="120px">ContextView Title Block</FlexItem>
            <FlexItem fluid component={FileListView}/>
        </Flex>
    }
}
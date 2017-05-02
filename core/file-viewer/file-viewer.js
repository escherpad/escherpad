import React from "react";
import PropTypes from "prop-types";

import {Flex, FlexItem} from "layout-components";

export default class FileViewer extends React.Component {
    static propTypes = {
        raViews: PropTypes.any.isRequired
    };

    render() {
        const {raViews} = this.props;
        const {FileListView, ..._raViews} = raViews;
        return <Flex column className="context-view">file view
            <FlexItem fixed height="120px">FileView Title Bar</FlexItem>
            {/*<FlexItem fluid component={FileListView}/>*/}
        </Flex>
    }
}
import React from "react";
import PropTypes from "prop-types";

import {Flex, FlexItem} from "layout-components";

export default class FileViewer extends React.Component {
    static propTypes = {
        raViews: PropTypes.any.isRequired
    };

    render() {
        const {style, raViews} = this.props;
        console.log(style);
        const {FileHeaderBar, FileTitleBar, CodeView, ..._raViews} = raViews;
        return <Flex column className="context-view" style={style}>file view
            <FlexItem fixed height="120px">FileView Title Bar</FlexItem>
            <FlexItem fluid component={CodeView}/>
        </Flex>
    }
}
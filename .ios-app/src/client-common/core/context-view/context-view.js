import React from "react";
import PropTypes from "prop-types";
export default class ContextView extends React.Component {
    static propTypes = {
        raViews: PropTypes.any.isRequired
    };

    render() {
        const {raViews} = this.props;
        const {FileListView} = raViews;
        return <div className="context-view">context view
            <FileListView/>
        </div>
    }
}
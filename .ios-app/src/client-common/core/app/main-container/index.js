import React from 'react';
import PropTypes from 'prop-types';

import "./index.css";

export default class MainContainer extends React.Component {
    static propTypes = {
        teams: PropTypes.any
    };

    render() {
        const {raViews, ..._props} = this.props;
        const {FileViewer, ..._raViews} = raViews;
        return <div className="main-container" {..._props}>main-container
            <FileViewer raViews={_raViews}/>
        </div>
    }
}
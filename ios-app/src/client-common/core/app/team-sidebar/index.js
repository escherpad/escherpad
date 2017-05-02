import React from 'react';
import PropTypes from 'prop-types';

import "./index.css";

export default class TeamSidebar extends React.Component {
    static propTypes = {
        teams: PropTypes.any
    };

    render() {
        const {raViews, ..._props} = this.props;
        const {FileViewer, _raViews} = raViews;
        return <div className="team-sidebar" {..._props}>team-sidebar</div>
    }
}
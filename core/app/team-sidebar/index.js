import React from 'react';
import PropTypes from 'prop-types';

import "./index.css";

export default class TeamSidebar extends React.Component {
    static propTypes = {
        teams: PropTypes.any
    };

    render() {
        return <div className="team-sidebar" {...this.props}>team-sidebar</div>
    }
}
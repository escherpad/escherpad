import React from 'react';
import PropTypes from 'prop-types';

import "./index.css";

export default class MainContainer extends React.Component {
    static propTypes = {
        teams: PropTypes.any
    };

    render() {
        return <div className="main-container" {...this.props}>main-container</div>
    }
}
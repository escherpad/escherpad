import React from 'react';
import PropTypes from 'prop-types';

import "./rounded-button.css";

export default function RoundedButton(props) {
    const {children, ..._props} = props;
    return <button className=".rounded-button">{children}</button>
}
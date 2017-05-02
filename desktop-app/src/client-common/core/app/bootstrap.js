import React from "react";
import PropTypes from 'prop-types';

const {any, func} = PropTypes;
export default class Bootstrap extends React.Component {
    propTypes = {
        store$: any,
        dispatch: any, // dispatch: func.isRequired,
    };

    shouldComponentUpdate(newProps, newState) {
        console.log("component should update");
        return false
    }

    render() {
        const props = this.props;
        console.log(props);
        return <div>hahaha</div>
    }
}

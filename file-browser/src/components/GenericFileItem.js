import React from 'react';
import PropTypes from 'prop-types';
// import {Flex, FlexItem} from "layout-components";

import "./file-item.css";
export default class GenericFileItem extends React.Component {
    static propTypes = {
        title: PropTypes.any,
        timeLapsed: PropTypes.any,
        breadCrumb: PropTypes.array,
        tagNames: PropTypes.any,

        dispatch: PropTypes.func.isRequired
    };

    render() {
        const props = this.props;
        return (
            <div className="file-item" style={props.style}>
                <h3>{props.title}</h3>
                {/*stuff inside file.view are for view only. Note: might not be the best way b/c changing
                 view mutates file as well.*/}
                {/*todo: decide on file data schema, walk through life-cycle*/}
                <span>{props.view.timeLapsed}</span>
                <span>{props.view.folder}</span>
                <span>{props.view.tagNames}</span>
            </div>)
    }
}

import React from 'react';
// import PropTypes from 'prop-types';
import SelectContainer from "../packages/selector-container/SelectContainer";
// import {Flex, FlexItem} from "layout-components";

function FileItemNormal({id, full_name}) {
    return <div key={id} className="file-item-normal-view">{full_name}</div>;
}

class ListTab extends React.Component {
    render() {
        const props = this.props;
        return (<div style={props.style}>{
            props.files.map((file, key) => <FileItemNormal {...file}/>)
        }</div>)
    }
}

export default SelectContainer((state) => {
    return {files: state.fileList}
}, ListTab)

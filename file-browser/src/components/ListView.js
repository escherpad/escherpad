import React from 'react';
import PropTypes from 'prop-types';
import SelectContainer from "../packages/selector-container/SelectContainer";
// import {Flex, FlexItem} from "layout-components";

class ListView extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        itemComponent: PropTypes.any.isRequired
    };

    render() {
        const {data, style = null, itemComponent: Item, ..._props} = this.props;
        return (
            <div style={style}>{
                data.map((file, idx) => <Item key={file._id} {...file}/>)
            }</div>)
    }
}
export default SelectContainer((state) => ({
    data: state.view.fileList
}), ListView)


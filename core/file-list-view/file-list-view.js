import React from "react";
export default class FileListView extends React.Component {
    render() {
        const {style, ..._props} = this.props;
        return <div className="file-list-view" style={style}>file list view</div>;
    }
}
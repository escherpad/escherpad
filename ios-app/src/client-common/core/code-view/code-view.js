import React from "react";

export default class CodeView extends React.Component {
    render() {
        const {style, ..._props} = this.props;
        return <div className="code-view" style={style}>
            code view
        </div>
    }
}

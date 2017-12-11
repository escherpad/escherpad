/** Created by ge on 4/26/16. */
// @flow
import React from "react";
import type {Element} from "react";

type Props = {
    isEmpty?: any,
    placeholder?: Element
};

class Placeholder extends React.Component<Props> {
    isEmpty(children) {
        const {isEmpty} = this.props;
        if (typeof isEmpty === 'boolean') return isEmpty;
        else if (typeof isEmpty === 'function') return isEmpty(children);
        else return (!children)
    }

    render() {
        const {children, placeholder, isEmpty, ..._props} = this.props;
        if (this.isEmpty(children)) return (<div {..._props}>{placeholder || ""}</div>);
        else return (<div {..._props}>{children}</div>);
    }
}

export default Placeholder;

/** Created by ge on 12/28/17. */
import React, {Component, Children} from "react";
import PropTypes from "prop-types";
import {Store} from "luna"

type Props = {
    store$: Store
};


export class LunaProvider extends Component<Props> {
    static childContextTypes = {
        store: PropTypes.any,
        dispatch: PropTypes.func
    };

    getChildContext() {
        return {
            store: this.store,
            dispatch: this.store.dispatch
        }
    }

    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }

    render() {
        const {children} = this.props;
        return Children.only(children)
    }
}

if (process.env.NODE_ENV !== 'production') {
    LunaProvider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.store !== nextProps.store) {
            console.warn("LunaProvider does not support live update on the store object.");
        }
    }
}
;


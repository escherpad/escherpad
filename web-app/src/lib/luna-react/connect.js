/** Created by ge on 12/6/16.
 * Usage Example
 * connect(mapStateToProp: key/selectionFunction/arrayOf'keys/etc, mapDispatchToProps)(component)
 * */

import React from "react";
import PropTypes from "prop-types";

export type ISelectorFunc = (state: any) => any

type Props = {
    store: any,
    dispatch: Function
}

// done: add dispatch api
export function connect(mapStateToProp: ISelectorFunc, mapDispatchToProps: Object) {

    return (Component: React.Component) => class Connected extends React.Component<Props> {
        static contextTypes = {
            store: PropTypes.any,
            dispatch: PropTypes.func
        };

        constructor(props, context) {
            super();
            this.storeToState = this.storeToState.bind(this);
        }

        storeToState(store) {
            this.setState(mapStateToProp(store))
        }

        componentWillMount() {
            this.subscription = this.context.store.subscribe(this.storeToState);
            if (typeof mapDispatchToProps === "undefined") this.dispatchProps = undefined;
            else if (typeof mapDispatchToProps === "function") this.dispatchProps = mapDispatchToProps(this.context.dispatch);
            else this.dispatchProps = Object.entries(mapDispatchToProps).reduce((d, kv) => ({
                    ...d, [kv[0]]: (...args: Array<any>) => this.context.dispatch(kv[1](...args))
                }), {});
        }

        componentWillUnmount() {
            // there is no way around this manual unsubscribe action.
            this.subscription.unsubscribe();
        }

        shouldComponentUpdate(newProps, newStates) {
            // note: both store and dispatch are required.
            // note2: state update *always* trigger re-render
            return Object.keys(newProps).length > 2;
        }

        render() {
            if (!this.state) return null;
            let props = {
                ...this.state,
                ...this.dispatchProps, //.map((v, k)=> {v: k})
                ...this.props
            };
            return <Component {...props}/>
        }
    }
}

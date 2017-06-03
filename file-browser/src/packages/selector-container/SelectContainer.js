/** SelectContainer Component
 * Usage Example
 * Selector(key/selectionFunction/arrayOf'keys/etc, component)
 * */

import React from "react";
import PropTypes from "prop-types";


export default function Selector(selector, Component) {

    return class SelectContainer extends React.Component {
        static propTypes = {
            /** store$ is a stream object. This prop is required because it is called during life cycle. */
            store$: PropTypes.any.isRequired,
            /** dispatch is not required because lots of components are read-only. */
            dispatch: PropTypes.func
        };

        constructor() {
            super();
            this.storeToState = this._storeToState.bind(this);
        }

        _storeToState(store) {
            this.setState(selector(store))
        }

        componentWillMount() {
            this.subscription = this.props.store$.subscribe(this.storeToState);
        }

        componentWillUnmount() {
            this.subscription.unsubscribe()
        }

        shouldComponentUpdate(newProps, newStates) {
            // note: both store and dispatch are required.
            // note2: state update *always* trigger re-render
            if (Object.keys(newProps).length > 2) return true;
            return false;
        }

        render() {
            if (!this.state) return <div></div>;
            let props = {...this.state, ...this.props};
            return <Component {...props}/>
        }
    }
}


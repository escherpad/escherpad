/** Created by ge on 12/6/16. */
/** Usage Example
 * Selector('key'/selectionFunction/arrayOf'keys/etc, component)
 * */

import React, {PropTypes} from "react";
import {autobind} from "core-decorators";

var {func, any} = PropTypes;

export default function Selector(selector, Component) {
  "use strict";

  return class SelectContainer extends React.Component {
    static propTypes = {
      store: any.isRequired,
      dispatch: func.isRequired
    };

    @autobind
    storeToState(store) {
      this.setState(selector(store))
    }

    componentWillMount() {
      this.subscription = this.props.store.subscribe(this.storeToState);
    }

    componentWillUnmount() {
      this.subscription.unsubscribe()
    }

    shouldComponentUpdate(newProps, newStates){
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

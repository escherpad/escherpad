/** Created by ge on 12/6/16. */
/** Usage Example
 * Selector('key'/selectionFunction/arrayOf'keys/etc, component)
 * */

import React, {PropTypes} from "react";
import autobind from "autobind-decorator";

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

    render() {
      if (!this.state) return <div></div>;
      let {store, dispatch, ..._props} = this.props;
      let props = {...this.state, ..._props};
      return <Component dispatch={dispatch} store={store} {...props}/>
    }
  }
}

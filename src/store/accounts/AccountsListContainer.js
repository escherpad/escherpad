/** Created by ge on 5/14/16. */
import React, {Component, PropTypes} from "react";

var {any} = PropTypes;
export default class AccountList extends Component {
  static propTypes = {
    store: any.isRequired
  };

  storeToState(state) {
    var {accounts} = state;
    var accountList = Object.keys(accounts).map(k=>{
      return accounts[k]
    });
    this.setState({accounts, accountList});
  }

  componentWillMount() {
    let store = this.props.store;
    this.subscription = store.subscribe(this.storeToState.bind(this));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    var {component, store, ...props} = this.props;
    var {accounts, accountList} = this.state;
    var Component = component;
    var dispatch = store.dispatch.bind(store);
    return (
      <Component {...props} store={store}
                            dispatch={dispatch}
                            accounts={accounts}
                            accountList={accountList}
      />
    )
  }
}

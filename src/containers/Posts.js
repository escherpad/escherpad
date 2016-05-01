/** Created by ge on 4/25/16. */
import React from "react";
var {node, func, any} = React.PropTypes;

export default class Posts extends React.Component {
  static propTypes = {
    component: func,
    store: any.isRequired,
    dispatch: func.isRequired
  };

  storeToState(state) {
    let agent = state.session.agent;
    let user = state.session.user;
    let {users, postList, posts} = state;
    this.setState({agent, user, users, posts, postList})
  }

  componentWillMount() {
    let store = this.props.store;
    this.subscription = store.subscribe(this.storeToState.bind(this));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    if (!this.state || !this.props.component) return (<div></div>);
    var {store, dispatch, component, ...props} = this.props;
    var {agent, user, users, posts, postList} = this.state;
    var newChild = React.createElement(
      this.props.component,
      {
        dispatch,
        ...props,
        agent, user, users, posts, postList
      });
    return (newChild);
  }
}


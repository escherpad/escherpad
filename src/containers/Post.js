/** Created by ge on 4/24/16. */
import React from "react";
var {node, func, any} = React.PropTypes;

export default class Post extends React.Component {
  static propTypes = {
    children: node,
    component: func,
    store: any.isRequired,
    dispatch: func.isRequired
  };

  storeToState(state) {
    let agent = state.session.agent;
    let user = state.session.user;
    let post = state.posts[state.editor.post];
    this.setState({post, agent, user})
  }

  componentWillMount() {
    let store = this.props.store;
    this.subscription = store.subscribe(this.storeToState.bind(this));
  }

  componentWillUnmount(){
    this.subscription.unsubscribe()
  }

  render() {
    if (!this.state || (!this.props.children && !this.props.component))
      return (<div></div>);
    var {store, dispatch, children, component, ...props} = this.props;
    var newChild;
    if (children) {
      newChild = React.cloneElement(
        this.props.children, {
          dispatch,
          ...props,
          agent: this.state.agent,
          user: this.state.user,
          post: this.state.post
        });
    } else if (component) {
      newChild = React.createElement(
        this.props.component, {
          dispatch,
          ...props,
          agent: this.state.agent,
          user: this.state.user,
          post: this.state.post
        })
    }
    return (newChild);
  }
}

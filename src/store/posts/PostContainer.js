/** Created by ge on 4/24/16. */
import React, {Component, PropTypes, cloneElement} from "react";
var {node, func, any} = PropTypes;
import autobind from "autobind-decorator";

export default class Post extends Component {
  static propTypes = {
    children: node,
    component: func,
    store: any.isRequired,
    dispatch: func.isRequired
  };

  @autobind
  storeToState(state) {
    let {agent, user} = state.session;
    let post = state.posts[state.editor.post];
    let options = state.editor.options;
    this.setState({post, agent, user, options})
  }

  componentWillMount() {
    const {store} = this.props;
    this.subscription = store.subscribe(this.storeToState);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const {store, dispatch, children: child, component: Component, ..._props} = this.props;
    const {agent, user, post, options} = this.state;
    if (!child && !Component) return (<div></div>);
    if (child) {
      return cloneElement(
        child, {
          dispatch,
          ..._props,
          store,
          agent,
          user,
          post,
          options
        });
    } else if (Component) {
      return <Component dispatch={dispatch} {..._props}
                        store={store}
                        agent={agent}
                        user={user}
                        post={post}
                        options={options}/>
    }
  }
}

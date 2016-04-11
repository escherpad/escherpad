/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import PostView from "../post-view/PostView";

const styles = {
  base: {
    position: "absolute",
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  styling: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSmoothing: "antialiased"
  },
  flexContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  flexColumn: {
    width: "50%",
    overflowY: "auto",
    //flex: "1 1 auto"
  }
};

@Radium
export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired
  };

  constructor() {
    super();
  }

  componentWillMount() {
  }

  static defaultProps = {
    items: []
  };
  // what does post view do?
  // post view takes in the posts from the store,
  // and the post stream,
  // to show the current post. Should really be called editor view.
  // editor view mostly take in the post object and a dispatch function

  render() {
    let store = this.props.store;
    let dispatch = store.dispatch.bind(store);
    return (
      <div className="layout-container" style={[styles.base, styles.styling, styles.flexContainer]}>
        <div className="TeamNavBar"></div>
        <div className="ListPanel" store={store} dispatch={dispatch}>
          <div className="PostList"></div>
          <div className="FilesListView"></div>
        </div>
        <PostView store={store} dispatch={dispatch}></PostView>
      </div>
    )
  }
}

/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import PostView from "../post-view/PostView";
import TeamNavBar from "../team-nav/TeamNavBar";
import ListPanel from "../list-view/ListPanel";

import {flexRow, flexFluid, flexFixed} from "../style-globals";

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
    justifyContent: "center"
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

  // what does post view do?
  // post view takes in the posts from the store,
  // and the post stream,
  // to show the current post. Should really be called editor view.
  // editor view mostly take in the post object and a dispatch function

  render() {
    let store = this.props.store;
    let dispatch = store.dispatch.bind(store);
    return (
      <div className="layout-container" style={[styles.base, styles.styling, flexRow]}>
        <PostView
          style={flexFluid}
          store={store}
          dispatch={dispatch}></PostView>
      </div>
    )
  }
}
// <TeamNavBar style={flexFixed}
// ></TeamNavBar>
// <ListPanel className="ListPanel"
// style={flexFixed}
// store={store}
// dispatch={dispatch}
//   ></ListPanel>

/** Created by ge on 4/18/16. */
import React from "react";
import ReactDOM from "react-dom";

import PostListView from "./PostListView";

export default class ListPanel extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  willReceiveProps(newProps) {
  }

  componentWillMount() {
    console.log(this.props);
    let store = this.props.store;
    store.subscribe((state)=> {
      let posts = Object.keys(state.posts).map((_)=>state.posts[_]).sort((a, b)=>(a[state.orderBy] - b[state.orderBy]));
      this.setState({posts, ...state.postList});
    });
  }

  render() {
    let posts = this.state ? this.state.posts : [];
    return (
      <div className="post-panel">
        <div className="control-bar">
          <div className="filters"></div>
          <div className="search-bar"></div>
          <div className="controls"></div>
        </div>
        <div className="hero">
          <button className="left"></button>
          <div className="center header">Notes</div>
          <button className="right"></button>
        </div>
        <div className="tab-control">
          <div className="tab">Team</div>
          <div className="tab">Just You</div>
          <div className="spacer"></div>
          <div className="control-item">recent</div>
        </div>
        <PostListView posts={posts}></PostListView>
      </div>
    )
  }
}

// <!--<PostListView posts={this.state.posts}></PostListView>-->



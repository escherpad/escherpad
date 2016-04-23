/** Created by ge on 4/18/16. */
import React from "react";
import ReactDOM from "react-dom";

import PostListItem from "./PostListItem";

export default class PostListView extends React.Component {
  static propTypes = {
    posts: React.PropTypes.any
  };

  render() {
    let posts = this.props.posts;
    return (
      <div className="post-list-view">
        {posts.map((_)=>(
          <PostListItem key={_.id} post={_}></PostListItem>
        ))}
      </div>
    )
  }
}


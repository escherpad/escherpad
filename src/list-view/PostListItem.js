/** Created by ge on 4/18/16. */
import React from "react";
import ReactDOM from "react-dom";


export default class PostListItem extends React.Component {
  static propTypes = {
    post: React.PropTypes.any,
  };

  render() {
    let post = this.props.post;
    return (
      <div className="post-list-item">
        {post.title}
        {post.excerpt}
      </div>
    )
  }
}


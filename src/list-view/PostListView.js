/** Created by ge on 4/18/16. */
import React from "react";
import FlexItem from "../layout/FlexItem";
import PostListItem from "./PostListItem";

var {any} = React.PropTypes;
export default class PostListView extends React.Component {
  static propTypes = {
    posts: any
  };

  render() {
    var {posts, dispatch} = this.props;
    return (
      <FlexItem fluid style={{overflowY: "auto"}}>
        {posts.map((post)=>(
          <PostListItem key={post.id} {...post}
                        dispatch={dispatch}
          ></PostListItem>
        ))}
      </FlexItem>
    )
  }
}

const containerStyle = {};

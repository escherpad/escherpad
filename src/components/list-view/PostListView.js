/** Created by ge on 4/18/16. */
import React from "react";
import {Flex, FlexItem} from 'layout-components';
import PostListItem from "./PostListItem";
import FlipMove from "react-flip-move";

var {any} = React.PropTypes;
export default class PostListView extends React.Component {
  static propTypes = {
    posts: any
  };

  render() {
    var {posts, dispatch} = this.props;
    return (
      <FlexItem fluid style={{overflowY: "auto"}}>
        <FlipMove duration={150} enterAnimation="fade" easing="ease-out">
          {posts.map((post, index)=>(
            <PostListItem key={post.id || index} {...post}
                          dispatch={dispatch}
            />
          ))}
        </FlipMove>
      </FlexItem>
    )
  }
}

const containerStyle = {};

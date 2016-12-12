/** Created by ge on 4/18/16. */
import React from "react";
import {Flex, FlexItem} from 'layout-components';
import PostListItem from "./PostListItem";
import FlipMove from "react-flip-move";

var {any, string, func} = React.PropTypes;
export default class PostListView extends React.Component {
  static propTypes = {
    posts: any,
    searchQuery: string,
    dispatch: func
  };

  // important for preventing the animation from getting interrupted.
  // state update overrides the result of this method.
  shouldComponentUpdate(nextProps, nextState) {
    const {posts, searchQuery} = nextProps;
    return !(searchQuery === this.props.searchQuery);
  }

  render() {
    const {posts, searchQuery, dispatch} = this.props;
    return (
      <FlexItem fluid style={{overflowY: "auto"}}>
        <FlipMove duration={150} enterAnimation="fade" easing="ease-out">
          {posts.map((post, index) => (
            <PostListItem searchQuery={searchQuery} key={post.id || index} {...post}
                          dispatch={dispatch}
            />
          ))}
        </FlipMove>
      </FlexItem>
    )
  }
}

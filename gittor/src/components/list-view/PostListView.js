/** Created by ge on 4/18/16. */
import React from "react";
import {Flex, FlexItem} from 'layout-components';
import PostListItem from "./PostListItem";
// import FlipMove from "react-flip-move";

const {any, string, func} = React.PropTypes;
export default class PostListView extends React.Component {
  static propTypes = {
    posts: any,
    currentFolder: any,
    searchQuery: string,
    dispatch: func
  };

  // important for preventing the animation from getting interrupted.
  // state update overrides the result of this method.
  shouldComponentUpdate(nextProps, nextState) {
    const {posts, searchQuery} = nextProps;
    return !(searchQuery === this.props.searchQuery && posts === this.props.posts);
  }

  render() {
    const {posts, currentFolder, searchQuery, dispatch} = this.props;
    return (
      <FlexItem fluid style={{overflowY: "auto"}}>
        {/*<FlipMove duration={150} enterAnimation="fade" easing="ease-out">*/}
          {posts.map((post, index) => (
            <PostListItem searchQuery={searchQuery} listParentFolder={currentFolder} key={post.id || index} {...post}
                          dispatch={dispatch}
            />
          ))}
        {/*</FlipMove>*/}
      </FlexItem>
    )
  }
}

/** Created by ge on 4/18/16. */
import React from "react";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";

import PostListView from "./PostListView";
var {func, array, any} = React.PropTypes;
export default class ListPanel extends React.Component {
  static propTypes = {
    agent: any,
    user: any,
    users: any,
    posts: any,
    dispatch: func.isRequired
  };

  componentDidMount() {
    var {posts, postList} = this.props;
    this.updatePosts(posts, postList);
  }

  componentWillReceiveProps(newProp) {
    var {posts, postList} = newProp;
    if (posts !== this.props.posts) this.updatePosts(posts, postList);
  }

  updatePosts(posts, {orderBy="createdAt"}={}) {
    var orderedPosts = Object.keys(posts)
      .map((_)=>posts[_])
      .sort((a, b)=>(a[orderBy] - b[orderBy]));
    this.setState({orderedPosts});
  }

  render() {
    var {orderedPosts=[]} = this.state || {};
    var {dispatch} = this.props;
    return (
      <Flex column fill align="stretch" style={{ padding: "0 20px" }}>
        <FlexItem fixed>
          <div className="search-bar"></div>
        </FlexItem>
        <FlexItem fixed>
          <div className="hero">
            <button className="left"></button>
            <div className="center header">Notes</div>
            <button className="right"></button>
          </div>
        </FlexItem>
        <FlexItem fixed>
          <div className="tab-bar">
            <div className="tab">Team</div>
            <div className="tab">Just You</div>
            <div className="spacer"></div>
            <div className="control-item">recent</div>
          </div>
        </FlexItem>
        <PostListView posts={orderedPosts} dispatch={dispatch}></PostListView>
      </Flex>
    )
  }
}


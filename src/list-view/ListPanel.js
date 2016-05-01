/** Created by ge on 4/18/16. */
import React from "react";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Input from "../input/Input";

import OrderBySelection from "./OrderBySelection";
require('./list-panel.scss');

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
    if (posts !== this.props.posts || postList !== this.props.postList) this.updatePosts(posts, postList);
  }

  updatePosts(posts, {orderBy="modifiedAt"}={}) {
    var orderedPosts = Object.keys(posts)
      .map((_)=>posts[_])
      .sort((a, b)=>(a[orderBy] - b[orderBy])).reverse();
    this.setState({orderedPosts});
  }

  render() {
    var {orderedPosts=[]} = this.state || {};
    var {dispatch, postList} = this.props;
    return (
      <Flex column fill align="stretch" style={{ padding: "0 20px" }} className="list-panel">
        <FlexItem fixed className="search-bar">
          <Input value={"test this"} icon={"search"}
                 placeholder={"those needles in haystack..."} style={{width: "100%"}}/>
        </FlexItem>
        <FlexItem fixed>
          <div className="hero" style={{height: "100px", width: "100%"}}>
            <Flex fill row align="center" className="center">
              <FlexItem fixed>
                <button></button>
              </FlexItem>
              <FlexItem fluid
                        className="header"
                        style={{textAlign: "center", fontSize: "30px", fontWeight: "500"}}
              >Notes</FlexItem>
              <FlexItem fixed>
                <button></button>
              </FlexItem>
            </Flex>
          </div>
        </FlexItem>
        <FlexItem fixed>
          <Flex row className="tab-bar">
            <FlexItem fixed></FlexItem>
            <FlexItem fixed></FlexItem>
            <FlexItem fluid></FlexItem>
            <OrderBySelection orderBy={postList.orderBy} dispatch={dispatch}></OrderBySelection>
          </Flex>
        </FlexItem>
        <PostListView posts={orderedPosts} dispatch={dispatch}></PostListView>
      </Flex>
    )
  }
}


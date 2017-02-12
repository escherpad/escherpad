/** Created by ge on 4/18/16. */
import React from "react";
import {autobind/*, throttle*/} from "core-decorators";
import _throttle from "lodash.throttle";
import {Flex, FlexItem} from 'layout-components';
import Input from "../input/Input";
import Selector from "../../lib/Selector";

import OrderBySelection from "./OrderBySelection";
import {getParentFolder} from "../account-list-view/BrowserColumnView";
import {SET_CURRENT_FOLDER, setCurrentFolder} from "../../store/postList";

import PostListView from "./PostListView";

function throttle(time = 300, options = {}) {
  return function (target, name, descriptor) {
    descriptor.value = _throttle(descriptor.value, time, options);
    return descriptor;
  };
}

require('./list-panel.scss');
const {func, array, any} = React.PropTypes;
class ListPanel extends React.Component {
  static propTypes = {
    agent: any,
    user: any,
    users: any,
    posts: any,
    dispatch: func.isRequired
  };

  componentDidMount() {
    const {posts, postList} = this.props;
    this.updatePosts(posts, postList);
  }

  componentWillReceiveProps(newProp) {
    const {posts, postList} = newProp;
    if (posts !== this.props.posts || postList !== this.props.postList) this.updatePosts(posts, postList);
  }

  /*done: add back button to go back to root folder*/
  @autobind
  goBack() {
    // length == 2 when "/first_level".split() == ["", "first_level"]
    const {accountKey, currentFolder} = this.props.postList || {};
    if (!!currentFolder && currentFolder.split('/').length <= 1) {
      console.log('reached root folder');
      this.props.dispatch(setCurrentFolder())
    } else {
      let parentFolder = getParentFolder(currentFolder);
      this.props.dispatch(setCurrentFolder(accountKey, parentFolder))
    }
  }

  //done: throttling is working perfectly.
  @throttle(50)
  updatePosts(posts, {orderBy = "modifiedAt", searchQuery = "", accountKey, currentFolder, maxLength = 15}={}) {
    let ascending = 1, _orderBy = orderBy;
    if (orderBy.match(/^-/)) {
      ascending = 0;
      _orderBy = orderBy.slice(1);
    }

    console.log('accountKey', accountKey);
    let orderedPosts = Object.keys(posts)
      .map((_) => posts[_])
      .filter(function (post, index, posts) {
        if (searchQuery !== "") {
          // feature: add scoped search => mingles with current path and account.
          return JSON.stringify(post).toLowerCase().match(searchQuery.toLowerCase())
        } else return (
          (typeof post.accountKey === "undefined" && accountKey === "localstorage") ||
          (typeof accountKey === "undefined" ? true :
              (post.accountKey === accountKey && (post.path || post.parentFolder).match(currentFolder))
          )
        );
      })
      .sort((a, b) => (
        a[_orderBy] > b[_orderBy] ? 1 :
          a[_orderBy] === b[_orderBy] ? 0 :
            -1
      ));
    this.setState({
      orderedPosts: ascending ?
        orderedPosts.slice(0, maxLength) :
        orderedPosts.reverse().slice(0, maxLength),
      currentSearchQuery: searchQuery
    });
  }

  @autobind
  onSearchInput(e) {
    let query = e.target.value;
    this.updateQuery(query);
  }

  updateQuery(query = "") {
    this.props.dispatch({
      type: "UPDATE_SEARCH_QUERY",
      query: query
    })
  }

  render() {
    let {orderedPosts = [], currentSearchQuery} = this.state || {};
    let {dispatch, postList, searchQuery} = this.props;
    return (
      <Flex column fill align="stretch" style={{padding: "0 20px"}} className="list-panel">
        <FlexItem fixed className="search-bar">
          <Input className="search-input"
                 value={postList.searchQuery} icon={"search"}
                 onChange={this.onSearchInput}
                 placeholder={"those needles in haystack..."} style={{width: "100%"}}/>
        </FlexItem>
        <FlexItem fixed>
          <div className="hero" style={{height: "100px", width: "100%"}}>
            <Flex fill row align="center" className="center">
              <FlexItem fixed>
                <button onClick={this.goBack}>back</button>
              </FlexItem>
              <FlexItem fluid
                        className="header"
                        style={{textAlign: "center", fontSize: "30px", fontWeight: "500"}}
              >{postList.currentFolder ?
                <span style={{color: "#23aaff"}}>{"../" + postList.currentFolder.split('/').slice(-1)[0].slice(-15)}</span>
                : "Notes"
              }</FlexItem>
              <FlexItem fixed>
                <button></button>
              </FlexItem>
            </Flex>
          </div>
        </FlexItem>
        <FlexItem fixed>
          <Flex row className="tab-bar">
            <FlexItem fixed/>
            <FlexItem fixed/>
            <FlexItem fluid/>
            <OrderBySelection orderBy={postList.orderBy} dispatch={dispatch}/>
          </Flex>
        </FlexItem>
        <PostListView key="list-view" posts={orderedPosts} currentFolder={postList.currentFolder} searchQuery={currentSearchQuery}
                      dispatch={dispatch}/>
      </Flex>
    )
  }
}

export default Selector((store) => {
  "use strict";
  let {agent, user} = store.session;
  let {users, postList, posts} = store;
  return {agent, user, users, posts, postList}
}, ListPanel)

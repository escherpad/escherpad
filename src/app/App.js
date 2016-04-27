/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Post from "../containers/Post";
import Posts from "../containers/Posts";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";


import PostView from "../post-view/PostView";
import TeamNavBar from "../team-nav/TeamNavBar";
import ListPanel from "../list-view/ListPanel";

const style = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSmoothing: "antialiased"
};

@Radium
export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired
  };

  componentWillMount() {
  }

  render() {
    let store = this.props.store;
    let dispatch = store.dispatch.bind(store);
    return (
      <Flex row fill align="stretch" style={style}>
        <FlexItem fixed style={{width: "500px"}}>
          <Posts store={store} dispatch={dispatch} component={ListPanel}
          ></Posts>
        </FlexItem>
        <FlexItem fluid>
          <Post store={store} dispatch={dispatch} component={MarkdownEditor}
                view="code"
          ></Post>
        </FlexItem>
      </Flex>
    )
  }
}
// <TeamNavBar style={flexFixed}
// ></TeamNavBar>

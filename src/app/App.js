/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import FlexHide from "../layout/FlexHide";
import Responsive from "../layout/Responsive";
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

  render() {
    var {store} = this.props;
    var dispatch = store.dispatch.bind(store);
    return (
      <Responsive breakPoints={{sm: 1000, lg: Infinity}}>
        <Flex sm row fill align="stretch" style={style}>
          <FlexItem fluid>
            <Post store={store} dispatch={dispatch} component={MarkdownEditor}
                  view="code"
            ></Post>
          </FlexItem>
        </Flex>
        <Flex lg row fill align="stretch" style={style}>
          <FlexItem fluid style={{flex: "1 1 300px"}}>
            <Posts store={store} dispatch={dispatch} component={ListPanel}></Posts>
          </FlexItem>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            <Post store={store} dispatch={dispatch} view="code" component={MarkdownEditor}></Post>
          </FlexItem>
        </Flex>
      </Responsive>
    );
  }
}
// <TeamNavBar style={flexFixed}
// ></TeamNavBar>

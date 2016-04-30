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

  componentWillMount() {
    var {store} = this.props;
    this.subscription = store.select('viewMode').subscribe((viewMode)=> {
      console.log('viewMode has changed: value = ', viewMode);
      this.setState({viewMode});
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    var {viewMode} = this.state;
    var {store} = this.props;
    var dispatch = store.dispatch.bind(store);
    return (
      <Responsive breakPoints={{sm: 1000, lg: Infinity}}>
        <div sm style={style}>
          <Post store={store} dispatch={dispatch} view="code" viewMode={viewMode} component={MarkdownEditor}
          ></Post>
        </div>
        <Flex lg row fill align="stretch" style={style}>
          <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
            <Posts store={store} dispatch={dispatch} component={ListPanel}></Posts>
          </FlexHide>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            <Post store={store} dispatch={dispatch} view="code" viewMode={viewMode} component={MarkdownEditor}></Post>
          </FlexItem>
        </Flex>
      </Responsive>
    );
    // }
  }
}
// <TeamNavBar style={flexFixed}
// ></TeamNavBar>

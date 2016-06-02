/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import Flex from "../components/layout/Flex";
import FlexItem from "../components/layout/FlexItem";
import FlexHide from "../components/layout/FlexHide";
import If from "../components/If";
import Responsive from "../components/layout/Responsive";
import Post from "../store/posts/PostContainer";
import Posts from "../store/posts/PostsContainer";
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";

import ListPanel from "../components/list-view/ListPanel";

const style = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSmoothing: "antialiased"
};

@Radium
export default class MainEditorView extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired
  };

  componentWillMount() {
    var {store} = this.props;
    this.subscription = store.select('viewMode').subscribe((viewMode)=> {
      this.setState({viewMode});
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    var {viewMode} = this.state;
    var {store, ...props} = this.props;
    var dispatch = store.dispatch.bind(store);
    return (
      <Responsive breakPoints={{sm: 1000, lg: Infinity}}>
        <div sm style={style}>
          <Post store={store} dispatch={dispatch} {...props} view="code" viewMode={viewMode} component={MarkdownEditor}
          ></Post>
        </div>
        <Flex lg row fill align="stretch" style={style}>
          <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
            <Posts store={store} dispatch={dispatch}  {...props}  component={ListPanel}></Posts>
          </FlexHide>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            <If ifData={viewMode}>
              <Post ifDefault store={store} dispatch={dispatch}  {...props}  view={"code"} viewMode={viewMode} component={MarkdownEditor}></Post>
              <Post ifValue={"zen-mode"} store={store} dispatch={dispatch} {...props} view="two-column" viewMode={viewMode} component={MarkdownEditor}></Post>
            </If>
          </FlexItem>
        </Flex>
      </Responsive>
    );
    // }
  }
}
// <TeamNavBar style={flexFixed}
// ></TeamNavBar>

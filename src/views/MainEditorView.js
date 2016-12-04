/** Created by ge on 3/10/16. */
import React from 'react';
import {Flex, FlexItem, FlexHide, Responsive} from 'layout-components';
import Post from "../store/posts/PostContainer";
import Posts from "../store/posts/PostsContainer";
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";

import ListPanel from "../components/list-view/ListPanel";

const style = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSmoothing: "antialiased"
};

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
    var {..._props} = this.props;
    return (
      <Responsive breakPoints={{sm: 979, lg: Infinity}}>
        <div data-sm style={style}>
          <Post view="code" viewMode={viewMode} component={MarkdownEditor} {..._props}/>
        </div>
        <Flex data-lg row fill align="stretch" style={style}>
          <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
            <Posts {..._props} component={ListPanel}/>
          </FlexHide>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            {(viewMode == "zen-mode") ?
              <Post {..._props} view="two-column" viewMode={viewMode} component={MarkdownEditor}/> :
              <Post {..._props} view="code" viewMode={viewMode} component={MarkdownEditor}/>
            }
          </FlexItem>
        </Flex>
      </Responsive>
    );
  }
}

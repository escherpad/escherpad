/** Created by ge on 3/10/16. */
import React, {Component, PropTypes} from 'react';
import Selector from "../lib/Selector";
import {Flex, FlexItem, FlexHide, Responsive} from 'layout-components';
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";
import BristolBoard from "../components/bristol-board/BristolBoard";

import ListPanel from "../components/list-view/ListPanel";

const style = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSmoothing: "antialiased"
};


const {string, any} = PropTypes;
class MainEditorView extends React.Component {
  static propTypes = {
    viewMode: string,
    post: any
  };

  render() {
    let {viewMode, post} = this.props;
    let Editor;
    let {title = ""} = (post || {});
    if (title.match(/\.ink$/)) {
      Editor = <BristolBoard {...this.props}/>
    } else if (title.match(/\.((r|py)?)md$/)) {
      Editor = (viewMode == "zen-mode") ?
        <MarkdownEditor view="two-column" viewMode={viewMode} {...this.props}/> :
        <MarkdownEditor view="code" viewMode={viewMode} {...this.props}/>
    } else {
      Editor = MarkdownEditor
    }

    return (
      <Responsive breakPoints={{sm: 979, lg: Infinity}}>
        <div data-sm style={style}>
          <MarkdownEditor view="code" viewMode={viewMode} {...this.props}/>
        </div>
        <Flex data-lg row fill align="stretch" style={style}>
          <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
            <ListPanel {...this.props}/>
          </FlexHide>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            {Editor}
          </FlexItem>
        </Flex>
      </Responsive>
    );
  }
}

export default Selector((state) => {
  "use strict";
  let {viewMode} = state;
  let post = state.posts[state.editor.post];
  return {viewMode, post}
}, MainEditorView);

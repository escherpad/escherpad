/** Created by ge on 3/10/16. */
import React, {Component, PropTypes} from 'react';
import Selector from "../lib/Selector";
import PostHeader from "../components/editor-view/PostHeader";
import TitleBar from "../components/editor-view/TitleBar";
import {Flex, FlexItem, FlexHide, Responsive} from 'layout-components';
import Notifications from "../components/notifications/notifications";
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";
import BristolBoard from "../components/bristol-board/BristolBoard";
// import PDF from "react-pdf-js";

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
    let {notices, ..._props} = this.props;
    let {viewMode, post, dispatch} = this.props;
    let Editor, SmallEditor;
    let {title = ""} = (post || {});
    if (!post) {
      Editor = <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {..._props}/>
        </FlexItem>
        <FlexItem fluid/>
      </Flex>;
      SmallEditor = Editor;
    } else if (title.match(/\.ink$/)) {
      Editor = <BristolBoard mode="ink" {..._props}/>;
      SmallEditor = Editor;
    } else if (title.match(/\.url$/)) {
      const url = post.source ? post.source.match(/URL=(.*)\b/)[1] : "";
      Editor = <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {..._props}/>
        </FlexItem>
        <FlexItem fixed>
          <TitleBar post={post}
                    options={{} /*options*/} {..._props}/>
        </FlexItem>
        <FlexItem fluid component="iframe" style={{width: "100%", height: "100%", border: "0px solid transparent"}}
                  src={url}/>
      </Flex>;
    } else if (title.match(/\.(png)$/)) {
      Editor = <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {..._props}/>
        </FlexItem>
        <FlexItem fixed>
          <TitleBar post={post}
                    options={{} /*options*/} {..._props}/>
        </FlexItem>
        <FlexItem fluid><img style={{margin: "auto auto"}}
                             src={post.previewURL}/></FlexItem>
      </Flex>;
      // <PDF file={post.previewURL.replace('blob:', '')} onDocumentComplete={() => null} onPageComplete={() => null}
      //      page={0}/>;
      SmallEditor = Editor;
    } else if (title.match(/\.(docx?|png)$/)) {
      Editor = <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {..._props}/>
        </FlexItem>
        <FlexItem fixed>
          <TitleBar post={post}
                    options={{} /*options*/} {..._props}/>
        </FlexItem>
        <FlexItem fluid component="iframe" style={{width: "100%", height: "100%", border: "0px solid transparent"}}
                  src={post.previewURL}/>
      </Flex>;
      // <PDF file={post.previewURL.replace('blob:', '')} onDocumentComplete={() => null} onPageComplete={() => null}
      //      page={0}/>;
      SmallEditor = Editor;
    } else if (title.match(/\.((r|py)?)md$/)) {
      // console.log('view mode is', viewMode);
      Editor = (viewMode === "zen-mode") ?
        <MarkdownEditor view="two-column" viewMode={viewMode} {..._props}/> :
        <MarkdownEditor view="code" viewMode={viewMode} {..._props}/>;
      SmallEditor =
        <MarkdownEditor view="code" viewMode={viewMode} {..._props}/>;
    } else {
      Editor = (viewMode === "zen-mode") ?
        <MarkdownEditor view="two-column" viewMode={viewMode} {..._props}/> :
        <MarkdownEditor view="code" viewMode={viewMode} {..._props}/>;
      SmallEditor =
        <MarkdownEditor view="code" viewMode={viewMode} {..._props}/>;
    }

    return (
      <div className="page-getContainer">
        <Notifications maxNumber={5} data={Object.keys(notices).map(k => notices[k])} dispatch={dispatch}/>
        <Responsive breakPoints={{sm: 979, lg: Infinity}}>
          <div data-sm style={style}>{SmallEditor}</div>
          <Flex data-lg row fill align="stretch" style={style}>
            <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
              <ListPanel {..._props}/>
            </FlexHide>
            <FlexItem fluid style={{flex: "8 8 auto"}}>{Editor}</FlexItem>
          </Flex>
        </Responsive>
      </div>
    );
  }
}

export default Selector((state) => {
  "use strict";
  let {viewMode, notices} = state;
  let post = state.posts[state.editor.postId];
  return {viewMode, notices, post}
}, MainEditorView);

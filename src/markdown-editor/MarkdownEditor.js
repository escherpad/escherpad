/** Created by ge on 4/24/16. */
import React from "react";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import PostHeader from "../editor-view/PostHeader"
import EditorView from "../editor-view/EditorView";

import getAceCursorPosition from "./getAceCursorPosition";

import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

export default class MarkdownEditor extends React.Component {
  static propTypes = {
    agent: React.PropTypes.any,
    user: React.PropTypes.any,
    post: React.PropTypes.any,
    dispatch: React.PropTypes.any.isRequired
  };

  constructor() {
    super();
    this._setCursorTarget = debounce(this.setCursorTarget.bind(this), 20);
    this._setEditorCursorScrollTarget = throttle(this.setEditorCursorScrollTarget.bind(this), 7, {rising: true});
  }

  render() {
    return (
      <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {...this.props}></PostHeader>
        </FlexItem>
        <FlexItem fluid>
          <Flex row align="stretch" fill>
            <FlexItem fluid>
              <MarkdownPreview {...this.props}
                ref={(prev)=>this.markdownPreview=prev}
                onSelect={this.onMarkdownSelect.bind(this)}
                onScroll={this._setEditorCursorScrollTarget}
              ></MarkdownPreview>
            </FlexItem>
            <FlexItem fluid>
              <EditorView {...this.props}
                ref={(_)=>this.editorView=_}
                onEditorScrollTop={this.setCursorTarget.bind(this)}
                onEditorChange={this._setCursorTarget}
              ></EditorView>
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    )
  }

  // this really need to be throttled because the `setScrollTop`
  setEditorCursorScrollTarget() {
    let scrollTop = this.markdownPreview.getScrollTop();
    if (!this.editorCursorPosition) this.editorCursorPosition = this.getEditorCursorPosition();
    if (!this.editorScrollTop) this.editorScrollTop = this.editorView.getScrollTop();
    var previewCursorScrollOffset = this.markdownPreview.state.cursorScrollOffset;
    let targetScrollTop = Math.max(0, scrollTop - previewCursorScrollOffset + this.editorCursorPosition + this.editorScrollTop);
    this.editorView.setScrollTop(targetScrollTop);
  }

  setCursorTarget() {
    this.editorCursorPosition = this.getEditorCursorPosition();
    this.editorScrollTop = this.editorView.getScrollTop();
    this.markdownPreview.setCursorTarget(this.editorCursorPosition);
  }

  getEditorCursorPosition() {
    let rect = getAceCursorPosition();
    if (!rect) return;
    return (rect.top + rect.bottom) / 2
  }

  onMarkdownSelect(position) {
    this.editorView.setCursor(position);
    this.editorCursorPosition = this.getEditorCursorPosition();
    this.editorView.clearSelection();
    this.editorView.CodeEditor.focus();
  }

}

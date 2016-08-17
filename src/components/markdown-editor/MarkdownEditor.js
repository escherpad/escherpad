/** Created by ge on 4/24/16. */
import React from "react";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Responsive from "../layout/Responsive";
import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import PostHeader from "../editor-view/PostHeader"
import EditorView from "../editor-view/EditorView";

import getAceCursorPosition from "./getAceCursorPosition";

import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

var {any, string} = React.PropTypes;
export default class MarkdownEditor extends React.Component {
  static propTypes = {
    agent: any.isRequired,
    user: any.isRequired,
    post: any.isRequired,
    dispatch: any.isRequired,
    view: string
  };

  static defaultProps = {
    view: "zen-mode"
  };

  constructor() {
    super();
    this._setCursorTarget = debounce(this.setCursorTarget.bind(this), 20);
    this._setEditorCursorScrollTarget = throttle(this.setEditorCursorScrollTarget.bind(this), 7, {rising: true});
  }

  render() {
    //todo: this will be removed after we add a post type selectior as a parent.
    if (!this.props.post) return (<div>post is not specified</div>);
    //todoEnd
    var {view, ...props} = this.props;
    if (view === "two-column") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {...props}></PostHeader>
          </FlexItem>
          <FlexItem fluid>
            <Flex row align="stretch" fill>
              <FlexItem fluid>
                <MarkdownPreview {...props}
                  ref={(prev)=>this.markdownPreview=prev}
                  onSelect={this.onMarkdownSelect.bind(this)}
                  onScroll={this._setEditorCursorScrollTarget}
                ></MarkdownPreview>
              </FlexItem>
              <FlexItem fluid>
                <EditorView {...props}
                  ref={(_)=>this.editorView=_}
                  onScroll={this.setCursorTarget.bind(this)}
                  onEditorChange={this._setCursorTarget}
                ></EditorView>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      )
    } else if (view === "two-row") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {...props}></PostHeader>
          </FlexItem>
          <FlexItem fluid>
            <Flex column align="stretch" fill>
              <FlexItem fluid>
                <MarkdownPreview {...props}
                  ref={(prev)=>this.markdownPreview=prev}
                  onSelect={this.onMarkdownSelect.bind(this)}
                  onScroll={this._setEditorCursorScrollTarget}
                ></MarkdownPreview>
              </FlexItem>
              <FlexItem fluid>
                <EditorView {...props}
                  ref={(_)=>this.editorView=_}
                  onScroll={this.setCursorTarget.bind(this)}
                  onEditorChange={this._setCursorTarget}
                ></EditorView>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      )
    } else if (view === "preview") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {...props}></PostHeader>
          </FlexItem>
          <FlexItem fluid>
            <MarkdownPreview {...props}
              ref={(prev)=>this.markdownPreview=prev}
              onSelect={this.onMarkdownSelect.bind(this)}
              onScroll={this._setEditorCursorScrollTarget}
            ></MarkdownPreview>
          </FlexItem>
        </Flex>
      )
    } else if (view === "code") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {...props}></PostHeader>
          </FlexItem>
          <FlexItem fluid>
            <EditorView {...props}
              ref={(_)=>this.editorView=_}
              style={{maxWidth: "1200px", marginLeft: "30px", marginRight: "auto"}}
              onScroll={this.setCursorTarget.bind(this)}
              onEditorChange={this._setCursorTarget}
            ></EditorView>
          </FlexItem>
        </Flex>
      )
    }
  }

  // this really need to be throttled because the `setScrollTop`
  setEditorCursorScrollTarget() {
    if (!this.markdownPreview || !this.editorView) return;
    let scrollTop = this.markdownPreview.getScrollTop();
    if (!this.editorCursorPosition) this.editorCursorPosition = this.getEditorCursorPosition();
    if (!this.editorScrollTop) this.editorScrollTop = this.editorView.getScrollTop();
    var previewCursorScrollOffset = this.markdownPreview.state.cursorScrollOffset;
    let targetScrollTop = Math.max(0, scrollTop - previewCursorScrollOffset + this.editorCursorPosition + this.editorScrollTop);
    this.editorView.setScrollTop(targetScrollTop);
  }

  setCursorTarget() {
    if (!this.markdownPreview || !this.editorView) return;
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
    if (!this.editorView) return;
    this.editorView.setCursor(position);
    this.editorCursorPosition = this.getEditorCursorPosition();
    this.editorView.clearSelection();
    this.editorView.CodeEditor.focus();
  }

}

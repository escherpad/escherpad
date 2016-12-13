/** Created by ge on 4/24/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import {Flex, FlexItem} from "layout-components";
import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import PostHeader from "../editor-view/PostHeader"
import EditorView from "../editor-view/EditorView";

import getAceCursorPosition from "./getAceCursorPosition";

import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

var {any, string} = PropTypes;
class MarkdownEditor extends Component {
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
    //todo: this will be removed after we add a post type selector as a parent.
    let {post} = this.props;
    if (!post) return (<div>post is not specified</div>);
    //todoEnd
    var {view, ..._props} = this.props;
    if (view === "two-column") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {..._props}/>
          </FlexItem>
          <FlexItem fluid>
            <Flex row align="stretch" fill>
              <FlexItem fluid>
                <MarkdownPreview {..._props}
                                 ref={(prev)=>this.markdownPreview = prev}
                                 onSelect={this.onMarkdownSelect.bind(this)}
                                 onScroll={this._setEditorCursorScrollTarget}
                />
              </FlexItem>
              <FlexItem fluid>
                <EditorView {..._props}
                            ref={(_)=>this.editorView = _}
                            onScroll={this.setCursorTarget.bind(this)}
                            onEditorChange={this._setCursorTarget}
                />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      )
    } else if (view === "two-row") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {..._props}/>
          </FlexItem>
          <FlexItem fluid>
            <Flex column align="stretch" fill>
              <FlexItem fluid>
                <MarkdownPreview {..._props}
                                 ref={(prev)=>this.markdownPreview = prev}
                                 onSelect={this.onMarkdownSelect.bind(this)}
                                 onScroll={this._setEditorCursorScrollTarget}
                />
              </FlexItem>
              <FlexItem fluid>
                <EditorView {..._props}
                            ref={(_)=>this.editorView = _}
                            onScroll={this.setCursorTarget.bind(this)}
                            onEditorChange={this._setCursorTarget}
                />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      )
    } else if (view === "preview") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {..._props}/>
          </FlexItem>
          <FlexItem fluid>
            <MarkdownPreview {..._props}
                             ref={(prev)=>this.markdownPreview = prev}
                             onSelect={this.onMarkdownSelect.bind(this)}
                             onScroll={this._setEditorCursorScrollTarget}
            />
          </FlexItem>
        </Flex>
      )
    } else if (view === "code") {
      return (
        <Flex column fill align="stretch">
          <FlexItem fixed>
            <PostHeader {..._props}/>
          </FlexItem>
          <FlexItem fluid>
            <EditorView {..._props}
                        ref={(_)=>this.editorView = _}
                        style={{maxWidth: "1200px", marginLeft: "30px", marginRight: "auto"}}
                        onScroll={this.setCursorTarget.bind(this)}
                        onEditorChange={this._setCursorTarget}
            />
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

export default Selector((store)=> {
  "use strict";
  let {agent, user} = store.session;
  let post = store.posts[store.editor.post];
  let options = store.editor.options;
  return {post, agent, user, options};
}, MarkdownEditor)

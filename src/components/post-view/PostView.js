/** Created by ge on 4/8/16. */
import React from 'react';
import Radium from 'radium';

// <EditorHeader style={styles.fixed}></EditorHeader>
// import EditorHeader from "./EditorHeader";
import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import EditorView from "../editor-view/EditorView";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

import {getAceCursorPosition} from "../markdown-editor/getAceCursorPosition";
import {flexStyle} from 'layout-components';
const {flexRow, flexFluid} = flexStyle;

@Radium
export default class PostView extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._setCursorTarget = debounce(this.setCursorTarget.bind(this), 20);
    this._setEditorCursorScrollTarget = throttle(this.setEditorCursorScrollTarget.bind(this), 7, {rising: true});
  }

  render() {
    let dispatch = this.props.dispatch;
    if (!this.state.post) {
      return (
        <div className="placeholder">
          <h1>Click here to start a new note</h1>
        </div>
      )
    } else {
      return (
        <div className="PostView" style={[styles.postContainer, flexRow, style]}>
          <MarkdownPreview agent={this.state.agent}
                           post={this.state.post}
                           style={[styles.twoColumn, flexFluid]}
                           ref={(prev)=>this.markdownPreview=prev}
                           onSelect={this.onMarkdownSelect.bind(this)}
                           onScroll={this._setEditorCursorScrollTarget}
          ></MarkdownPreview>
          <EditorView ref={(_)=>this.editorView=_}
                      style={[styles.twoColumn, flexFluid]}
                      user={this.state.user}
                      agent={this.state.agent}
                      post={this.state.post}
                      dispatch={dispatch}
                      onScroll={this.setCursorTarget.bind(this)}
                      onEditorChange={this._setCursorTarget}
          ></EditorView>
        </div>
      )
    }
  }

  componentWillMount() {
    let store = this.props.store;
    store
    // .throttleTime(10)
      .subscribe((state)=> {
        let post = state.posts[state.editor.post];
        let agent = state.session.agent;
        let user = state.session.user;
        setImmediate(()=>this.setState({post, agent, user}))
      })
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

const styles = {
  postContainer: {
    position: "absolute",
    left: 0, right: 0, top: 0, bottom: 0,
    alighItems: "stretch"
  },
  twoColumn: {
    width: "50%"
  }
};

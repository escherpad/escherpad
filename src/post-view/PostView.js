/** Created by ge on 4/8/16. */
import React from 'react';
import Radium from 'radium';

import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import EditorView from "../editor-view/EditorView";
import * as _ from "lodash";

import {getAceCursorPosition} from "./getAceCursorPosition";

const styles = {
  postContainer: {
    position: "absolute",
    left: 0, right: 0, top: 0, bottom: 0,
    display: "flex",
    flexDirection: "row",
    alighItems: "stretch"
  },
  fixed: {
    flex: "0 0 auto"
  },
  fluid: {
    width: "50%",
    flex: "1 1 auto"
  }
};
@Radium
export default class PostView extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._setCursorTarget = _.debounce(this.setCursorTarget.bind(this), 20);
    this._setEditorCursorScrollTarget = _.throttle(this.setEditorCursorScrollTarget.bind(this), 20);
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
        <div className="PostView" style={styles.postContainer}>
          <MarkdownPreview agent={this.state.agent}
                           post={this.state.post}
                           style={styles.fluid}
                           ref={(prev)=>this.markdownPreview=prev}
                           onSelect={this.onMarkdownSelect.bind(this)}
                           onScroll={this._setEditorCursorScrollTarget}
          ></MarkdownPreview>
          <EditorView ref={(_)=>this.editorView=_}
                      style={styles.fluid}
                      user={this.state.user}
                      agent={this.state.agent}
                      post={this.state.post}
                      dispatch={dispatch}
                      onEditorScrollTop={this.setCursorTarget.bind(this)}
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
  setEditorCursorScrollTarget(scrollTop) {
    var cursorPosition = this.getEditorCursorPosition();
    var st = this.editorView.getScrollTop();
    var previewCursorScrollOffset = this.markdownPreview.state.cursorScrollOffset;
    var targetScrollTop = scrollTop - previewCursorScrollOffset + cursorPosition + st;
    this.editorView.setScrollTop(Math.max(0, targetScrollTop));
  }

  setCursorTarget() {
    let cursorPosition = this.getEditorCursorPosition();
    this.markdownPreview.setCursorTarget(cursorPosition);
  }

  getEditorCursorPosition() {
    let rect = getAceCursorPosition();
    if (!rect) return;
    return (rect.top + rect.bottom) / 2
  }

  onMarkdownSelect(position) {
    this.editorView.setCursor(position);
    this.editorView.clearSelection();
    this.editorView.CodeEditor.focus();
  }

}

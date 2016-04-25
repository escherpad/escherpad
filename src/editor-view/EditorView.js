/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from "./TitleBar";
import CodeEditor from "./CodeEditor";
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";

require('./ace-gutter.scss');
const styles = {
  marginTop: "20px",
  boxSizing: "border-box"
};

export default class EditorView extends React.Component {
  static propTypes = {
    agent: React.PropTypes.any.isRequired,
    post: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    onEditorScroll: React.PropTypes.func,
    onEditorChange: React.PropTypes.func,
    style: React.PropTypes.any
  };

  render() {
    let agent = this.props.agent;
    let post = this.props.post;
    let presence = post.presence ? post.presence[agent] : null;
    var cursorPosition = presence ? presence.cursor : undefined;
    let onChange = this.onChange.bind(this);
    let onChangeScrollTop = this.props.onEditorScrollTop;
    let dispatch = this.props.dispatch;
    return (
      <Flex column fill>
        <FlexItem fixed>
          <TitleBar post={post}
                    dispatch={dispatch}
          ></TitleBar>
        </FlexItem>
        <FlexItem fluid>
          <CodeEditor ref={(_)=>this.CodeEditor=_}
                      style={styles}
                      value={post.source}
                      cursorPosition={cursorPosition}
                      version={post._sourceVersion}
                      mimeType={post.type}
                      onChange={onChange}
                      onChangeScrollTop={onChangeScrollTop}
          ></CodeEditor>
        </FlexItem>
      </Flex>
    )
  }

  setCursor(position) {
    /* should not access the ace editor low-level api.
     * Accessing via the CodeEditor Child Component */
    this.CodeEditor.setCursor(position);
  }

  clearSelection() {
    this.CodeEditor.clearSelection();
  }

  getScrollTop() {
    return this.CodeEditor.getScrollTop();
  }

  setScrollTop(scrollTop) {
    this.CodeEditor.setScrollTop(scrollTop);
    return this;
  }

  componentDidMount() {
    this.nativeElem = ReactDOM.findDOMNode(this);
    this.nativeElem.addEventListener("reflow", this.onReflow, true);
    this.dispatch = this.props.dispatch;
  }

  componentWillUnmount() {
    this.nativeElem.removeEventListener("reflow", this.onReflow, true);
  }

  onReflow(e) {
    window.dispatchEvent(new CustomEvent("reflow"));
  }

  onChange(source, cursor, version) {
    let user = this.props.user;
    let post = this.props.post;
    let agent = this.props.agent;
    let action = {
      type: "UPDATE_POST",
      $agent: agent,
      post: {
        id: post.id,
        source: source,
        presence: {},
        _sourceVersion: version
      }
    };
    action.post.presence[agent] = {user, agent, cursor};
    this.dispatch(action);
    if (this.props.onEditorChange) this.props.onEditorChange(source, cursor);
  }
}

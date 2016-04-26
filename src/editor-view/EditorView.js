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

var {any, func} = React.PropTypes;
export default class EditorView extends React.Component {
  static propTypes = {
    agent: any.isRequired,
    post: any.isRequired,
    dispatch: func.isRequired,
    onChange: func,
    onScroll: func,
    style: any
  };

  render() {
    var {agent, user, post, dispatch, onScroll, style, ...props} = this.props;
    let presence = post.presence ? post.presence[agent] : null;
    var cursorPosition = presence ? presence.cursor : undefined;
    let onChange = this.onChange.bind(this);
    return (
      <Flex column fill style={style}>
        <FlexItem fixed>
          <TitleBar {...post}
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
                      onChangeScrollTop={onScroll}
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
    var {user, post, agent} = this.props;
    var modifiedAt = Date.now();
    let action = {
      type: "UPDATE_POST",
      $agent: agent,
      post: {
        id: post.id,
        source,
        modifiedAt,
        presence: {},
        _sourceVersion: version
      }
    };
    action.post.presence[agent] = {user, agent, cursor};
    this.dispatch(action);
    if (this.props.onEditorChange) this.props.onEditorChange(source, cursor);
  }
}

/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from "./TitleBar";
import CodeEditor from "./CodeEditor";
import {Flex, FlexItem} from "layout-components";

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
    let {agent, user, post, options = {}, onScroll, style, ...props} = this.props;
    let {id = "", source = "", _v = 0, type} = post;
    if (typeof source !== 'string') source = JSON.stringify(source);
    let presence = post.presence ? post.presence[agent] : null;
    let cursorPosition = presence ? presence.cursor : undefined;
    let onChange = this.onChange.bind(this);
    return (
      <Flex column fill style={style}>
        <FlexItem fixed>
          <TitleBar post={post}
                    options={options} {...props}/>
        </FlexItem>
        <FlexItem fluid>
          <CodeEditor key={id}
                      ref={(_) => this.CodeEditor = _}
                      style={styles}
                      value={source}
                      cursorPosition={cursorPosition}
                      version={_v}
                      mimeType={type}
                      onChange={onChange}
                      onChangeScrollTop={onScroll} {...options}
          />
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
  }

  componentWillUnmount() {
  }

  onChange(source, cursor, version) {
    let {user, post, agent, dispatch} = this.props;
    //todo: use MERGE_POST type instead?
    let action = {
      type: "UPDATE_POST",
      $agent: agent,
      post: {
        id: post.id,
        source,
        presence: {},
        _v: version
      }
    };
    if (post.source !== source) action.post.modifiedAt = Date.now();
    action.post.presence[agent] = {user, agent, cursor};
    dispatch(action);
    if (this.props.onEditorChange) this.props.onEditorChange(source, cursor);
  }
}

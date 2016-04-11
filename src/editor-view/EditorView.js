/** Created by ge on 3/10/16. */
import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import EditorHeader from "./EditorHeader";
import TitleBar from "./TitleBar";
import CodeEditor from "./CodeEditor";

require('./ace-gutter.scss');
const styles = {
  container: {
    display: 'flex',
    flexDirection: "column"
  },
  fixed: {
    flex: "0 0 auto"
  },
  fluid: {
    flex: "1 1 auto"
  },
  editor: {
    marginTop: "20px",
    boxSizing: "border-box"
  }
};

@Radium
export default class EditorView extends React.Component {
  static propTypes = {
    agent: React.PropTypes.any.isRequired,
    post: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    style: React.PropTypes.any
  };

  componentDidMount() {
    this.nativeElem = ReactDOM.findDOMNode(this);
    this.nativeElem.addEventListener("reflow", this.onReflow, true);
  }

  componentWillUnmount() {
    this.nativeElem.removeEventListener("reflow", this.onReflow, true);
  }

  onReflow(e) {
    window.dispatchEvent(new CustomEvent("reflow"));
  }

  onChange(source) {
    let post = this.props.post;
    let agent = this.props.agent;
    let dispatch = this.props.dispatch;
    dispatch({
      type: "UPDATE_POST",
      $agent: agent,
      post: {
        id: post.id,
        source: source
      }
    })
  }

  onSelectionChange(selection) {
    // console.log('-------------------', selection);
  }
  onCursorChange(cursor) {
    let user = this.props.user;
    let post = this.props.post;
    let agent = this.props.agent;
    let action = {
      type: "UPDATE_POST_PRESENCE",
      post: {
        id: post.id,
        presence: {}
      }
    };
    action.post.presence[agent] = {user, agent, cursor};
    let dispatch = this.props.dispatch;
    dispatch(action)
  }

  render() {
    let post = this.props.post;
    let onChange = this.onChange.bind(this);
    let onCursorChange = this.onCursorChange.bind(this);
    let onSelectionChange = this.onSelectionChange.bind(this);
    let dispatch = this.props.dispatch;
    return (
      <div className="editor-view" style={[this.props.style, styles.container]}>
        <EditorHeader style={styles.fixed}></EditorHeader>
        <TitleBar style={styles.fixed}
                  post={post}
                  dispatch={dispatch}
        ></TitleBar>
        <CodeEditor style={[styles.fluid, styles.editor]}
                    value={post.source}
                    mimeType={post.type}
                    onChange={onChange}
                    onCursorChange={onCursorChange}
                    onSelectionChange={onSelectionChange}
        ></CodeEditor>
      </div>
    )
  }
}

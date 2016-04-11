/** Created by ge on 4/8/16. */
import React from 'react';
import Radium from 'radium';

import MarkdownPreview from '../markdown-preview/MarkdownPreview';
import EditorView from "../editor-view/EditorView";


const styles = {
  postContainer: {
    position: "absolute",
    left: 0, right: 0, top: 0, bottom: 0,
    display: "flex",
    flexDirection: "row",
    alighItems: "stretch",
  },
  scrollContainer: {
    overflowY: "auto",
  },
  article: {
    padding: "100px 50px 500px 50px",
    boxSizing: "border-box",
    margin: "0 auto",
    width: "100%",
    maxWidth: "788px",
    left: 0, right: 0,
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
  }

  componentDidMount() {
  }

  componentWillMount() {
    let store = this.props.store;
    store.subscribe((state)=> {
      let post = state.posts[state.editor.post];
      let agent = state.session.agent;
      let user = state.session.user;
      this.setState({post, agent, user})
    })
  }

  static defaultProps = {
    items: []
  };


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
          <div className="scroll-container" style={[styles.fluid, styles.scrollContainer]}>
            <MarkdownPreview agent={this.state.agent} post={this.state.post} style={styles.article}></MarkdownPreview>
          </div>
          <EditorView style={styles.fluid}
                      user={this.state.user}
                      agent={this.state.agent}
                      post={this.state.post}
                      dispatch={dispatch}></EditorView>
        </div>
      )
    }
  }
}

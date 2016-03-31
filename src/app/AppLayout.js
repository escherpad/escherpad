/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import ArticleView from '../article-view/ArticleView';
import EditorView from '../editor-view/EditorView';


const styles = {
  base: {
    position: "absolute",
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  styling: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSmoothing: "antialiased"
  },
  flexContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  flexColumn: {
    width: "50%",
    overflowY: "auto",
    //flex: "1 1 auto"
  }
};

@Radium
export default class AppLayout extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    //this.store = this.props.store;
  }

  static defaultProps = {
    items: []
  };

  render() {
    console.log(this.props);
    return (
      <div className="layout-container" style={[styles.base, styles.styling, styles.flexContainer]}>
        <div className="side-panel" show={false}>
          <div className="nav-column"></div>
          <div className="list-view"></div>
        </div>
        <ArticleView format="markdown" style={styles.flexColumn} data={'haha'}></ArticleView>
        <EditorView mimeType="markdown" title="" setter="" getter="" style={styles.flexColumn}></EditorView>
      </div>
    )
  }
}

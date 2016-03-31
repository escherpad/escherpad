/** Created by ge on 3/30/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

require("github-markdown-css/github-markdown.css");

require('highlight.js/styles/github.css');
var highlight = require("highlight.js");

@Radium
export default class Markdown extends React.Component {
  static propTypes = {
    html: React.PropTypes.string
    //style: React.PropTypes.any.isRequired
  };

  defaultStyle = {
  };

  //markdown-it markdown-it-abbr markdown-it-checkbox markdown-it-deflist markdown-it-footnote markdown-it-ins markdown-it-mark markdown-it-math markdown-it-sub markdown-it-sup markdown-it-toc
  constructor() {
    super();
  }

  componentDidUpdate() {
    //let node = ReactDOM.findDOMNode(this);
    //if (node) {
    //  let blocks = node.querySelectorAll('pre code');
    //  let list = Array.prototype.slice.call(blocks);
    //  list.forEach((block)=>highlight.highlightBlock(block));
    //}
  }

  render() {
    return (
      <article className="markdown-view markdown-body" style={[this.defaultStyle, this.props.style]}
           dangerouslySetInnerHTML={{__html: this.props.html}}></article>
    );
  }
}


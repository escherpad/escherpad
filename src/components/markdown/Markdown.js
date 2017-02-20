/** Created by ge on 3/30/16. */
import React from 'react';
import ReactDOM from "react-dom";

require("github-markdown-css/github-markdown.css");

import ast2React  from './markdown-it-react-renderer';

let MarkdownIt = require('markdown-it');
let MarkdownItTaskLists = require('markdown-it-task-lists');
//let MarkdownItCheckbox = require('markdown-it-checkbox');
let MarkdownItFlowdock = require('markdown-it-flowdock');
let MarkdownItFootnote = require('markdown-it-footnote');
let MarkdownItMark = require('markdown-it-mark');
//let MarkdownItInsDel = require('markdown-it-ins-del');
let MarkdownItEmoji = require('markdown-it-emoji');
let MarkdownItAbbr = require('markdown-it-abbr');
import MarkdownItMath from './markdown-it-mathjax';
let MarkdownItHighlightjs = require('markdown-it-highlightjs');
let MarkdownItToc = require('markdown-it-toc');
let MarkdownItDeflist = require('markdown-it-deflist');
let MarkdownItFrontMatter = require('markdown-it-front-matter');

require('highlight.js/styles/github.css');
let highlight = require("highlight.js");

const marked = new MarkdownIt({
  html: true,// avoid xxs attacks
  linkify: true
});

marked
  .use(MarkdownItAbbr)
  .use(MarkdownItToc)
  .use(MarkdownItDeflist)
  .use(MarkdownItTaskLists)
  .use(MarkdownItEmoji)
  //.use(MarkdownItCheckbox)
  //.use(MarkdownItFlowdock) // bug with nested image/link
  .use(MarkdownItMark)
  //.use(MarkdownItInsDel)
  .use(MarkdownItMath)
  // .use(MarkdownItMathjax)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  // todo: move this marked definition into the react component, to allow interception of `frontmatter`.
  .use(MarkdownItFrontMatter, (fm) => console.log(fm));
// .use(MarkdownItMath, {
//   inlineOpen: '$',//'\\(',
//   inlineClose: '$',//'\\)',
//   blockOpen: '$$',//'\\[',
//   blockClose: '$$',//'\\]',
//   renderingOptions: {},
//   inlineRenderer: (string)=> {
//     let rendered = katex.renderToString(string);
//     return rendered;
//   },
//   blockRenderer: (string)=> {
//     let rendered = katex.renderToString(string, {displayMode: true});
//     return rendered;
//   }
// });

let {string, bool, func, any} = React.PropTypes;
export default class Markdown extends React.Component {
  static propTypes = {
    src: string,
    placeholder: string,
    isEmpty: bool, // if `isEmpty` is `true`, then the markdown shows the placeholder regardless of the string passed in.
    style: any,
    onMouseUp: func,
    afterRender: func
  };


  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.nativeElement.addEventListener('mouseup', this.onMouseUp);
    if (typeof this.props.afterRender === "function") this.props.afterRender(this.nativeElement);
  }

  shouldComponentUpdate(newProps) {
    return (this.props.src !== newProps.src);
  }

  componentDidUpdate() {
    if (typeof this.props.afterRender === "function") this.props.afterRender(this.nativeElement);
  }

  componentWillUnmount() {
    this.nativeElement.removeEventListener('mouseup', this.onMouseUp);
  }


  onMouseUp = (e) => {
    if (this.props && this.props.onMouseUp) this.props.onMouseUp(e);
  };

  isEmpty(src = "") {
    return (src.trim() === "");
  }

  render() {
    const {src, style} = this.props;
    let ast, env = {global_equation_index: 0}, children;
    try {
      // in progress: make this component truly react, use ast and a react renderer instead.
      ast = marked.parse(src, env);
      children = ast2React(ast);
      // console.log(ast, children);
    } catch (e) {
      console.warn("markdown error: ", e);
    }
    return <article className="markdown-view markdown-body" style={style}>{children}</article>;
  }
}

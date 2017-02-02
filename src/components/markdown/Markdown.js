/** Created by ge on 3/30/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

require("github-markdown-css/github-markdown.css");

let MarkdownIt = require('markdown-it');
let MarkdownItTaskLists = require('markdown-it-task-lists');
//let MarkdownItCheckbox = require('markdown-it-checkbox');
let MarkdownItFlowdock = require('markdown-it-flowdock');
let MarkdownItFootnote = require('markdown-it-footnote');
let MarkdownItMark = require('markdown-it-mark');
//let MarkdownItInsDel = require('markdown-it-ins-del');
let MarkdownItEmoji = require('markdown-it-emoji');
let MarkdownItAbbr = require('markdown-it-abbr');
// let MarkdownItMath = require('markdown-it-math');
let MarkdownItHighlightjs = require('markdown-it-highlightjs');
let MarkdownItToc = require('markdown-it-toc');
let MarkdownItDeflist = require('markdown-it-deflist');

require('highlight.js/styles/github.css');
let highlight = require("highlight.js");

const katex = require('katex');

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
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs);
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

import throttle from "lodash.throttle";

let {string, bool, func, any} = React.PropTypes;
@Radium
export default class Markdown extends React.Component {
  static propTypes = {
    src: string,
    placeholder: string,
    isEmpty: bool, // if `isEmpty` is `true`, then the markdown shows the placeholder regardless of the string passed in.
    style: any,
    onMouseUp: func,
    async: any,
    afterRender: func
  };

  shouldComponentUpdate(newProps) {
    return (this.props.src !== newProps.src);
  }

  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.nativeElement.addEventListener('mouseup', this.onMouseUp);
    this.asyncMarkdown = throttle(this.asyncMarkdown, 100);
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

  asyncMarkdown = () => {
    let {src, placeholder, isEmpty} = this.props;
    let source = src;
    if (isEmpty || this.isEmpty(src)) source = placeholder || "";
    let html;
    try {
      html = marked.render(source);
      // todo: make this component truly react, use ast and a react renderer instead.
      // let env = {};
      // let ast = marked.parse(source, env);
      // console.log(ast);
      // ast.forEach((token, ind)=>{
      // })
    } catch (e) {
      console.warn("markdown error: ", e);
      html = source;
    }
    this.nativeElement.innerHTML = html || "";
    if (this.props.afterRender) this.props.afterRender(this.nativeElement);
  };

  renderAsync() {
    setImmediate(this.asyncMarkdown);
    let style = this.props.style;
    return <article className="markdown-view markdown-body" style={style}/>;
  }

  render() {
    if (this.props.async) return this.renderAsync();
    let source = this.props.src || this.props.placeholder || "";
    let html;
    try {
      html = marked.render(source);
    } catch (e) {
      console.warn("markdown error: ", e);
      html = source;
    }
    let style = this.props.style;
    return <article className="markdown-view markdown-body" style={style}
                    dangerouslySetInnerHTML={{__html: html}}/>;
  }
}

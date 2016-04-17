/** Created by ge on 3/30/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

require("github-markdown-css/github-markdown.css");

var MarkdownIt = require('markdown-it');
var MarkdownItTaskLists = require('markdown-it-task-lists');
//var MarkdownItCheckbox = require('markdown-it-checkbox');
var MarkdownItFlowdock = require('markdown-it-flowdock');
var MarkdownItFootnote = require('markdown-it-footnote');
var MarkdownItMark = require('markdown-it-mark');
//var MarkdownItInsDel = require('markdown-it-ins-del');
var MarkdownItEmoji = require('markdown-it-emoji');
var MarkdownItAbbr = require('markdown-it-abbr');
var MarkdownItMath = require('markdown-it-math');
var MarkdownItHighlightjs = require('markdown-it-highlightjs');
var MarkdownItToc = require('markdown-it-toc');
var MarkdownItDeflist = require('markdown-it-deflist');

require('highlight.js/styles/github.css');
var highlight = require("highlight.js");

var katex = require('katex');

var marked = new MarkdownIt({
  html: true// avoid xxs attacks
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
  .use(MarkdownItHighlightjs)
  .use(MarkdownItMath, {
    inlineOpen: '$',//'\\(',
    inlineClose: '$',//'\\)',
    blockOpen: '$$',//'\\[',
    blockClose: '$$',//'\\]',
    renderingOptions: {},
    inlineRenderer: (string)=> {
      let rendered = katex.renderToString(string);
      return rendered;
    },
    blockRenderer: (string)=> {
      let rendered = katex.renderToString(string, {displayMode: true});
      return rendered;
    }
  });

import * as _ from "lodash";

@Radium
export default class Markdown extends React.Component {
  static propTypes = {
    src: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.any,
    onMouseUp: React.PropTypes.func,
    async: React.PropTypes.any,
    afterRender: React.PropTypes.func
  };

  shouldComponentUpdate(newProps) {
    return (this.props.src !== newProps.src);
  }

  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.nativeElement.addEventListener('mouseup', this.onMouseUp);
    this.asyncMarkdown = _.throttle(this.asyncMarkdown, 200);
  }

  componentWillUnmount() {
    this.nativeElement.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (e)=> {
    if (this.props && this.props.onMouseUp) this.props.onMouseUp(e);
  };

  asyncMarkdown = ()=> {
    var source = this.props.src || this.props.placeholder || "";
    var html;
    try {
      html = marked.render(source);
    } catch (e) {
      console.log("markdown error: ", e);
      html = source;
    }
    this.nativeElement.innerHTML = html;
    if (this.props.afterRender) this.props.afterRender(this.nativeElement);
  };

  renderAsync() {
    setImmediate(this.asyncMarkdown);
    var style = this.props.style;
    return (
      <article className="markdown-view markdown-body" style={style}></article>
    )
  }

  render() {
    if (this.props.async) return this.renderAsync();
    var source = this.props.src || this.props.placeholder || "";
    var html;
    try {
      html = marked.render(source);
    } catch (e) {
      console.log("markdown error: ", e);
      html = source;
    }
    var style = this.props.style;
    return (<article className="markdown-view markdown-body" style={style}
                     dangerouslySetInnerHTML={{__html: html}}></article>);
  }
}

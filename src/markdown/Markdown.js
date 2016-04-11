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

@Radium
export default class Markdown extends React.Component {
  static propTypes = {
    src: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.any
  };

  defaultStyle = {
    // width: "100%",
    // minHeight: "100%"
  };

  constructor() {
    super();
  }

  componentDidUpdate() {
  }

  render() {
    var source = this.props.src || this.props.placeholder || "";
    var html;
    try {
      html = marked.render(source);
    } catch (e) {
      console.log("markdown error: ", e);
      html = source;
    }
    var style = [this.defaultStyle, this.props.style];
    return (
      <article className="markdown-view markdown-body" style={style}
               dangerouslySetInnerHTML={{__html: html}}></article>
    );
  }
}


/** Created by ge on 3/24/16. */
export const PATCH_PREVIEW = "PATCH_PREVIEW";
export const SET_SOURCE = "SET_SOURCE";
export const SET_RENDERED = "SET_RENDERED";

var initialState = {
  source: "",
  rendered: ""
};
export function preview(state = initialState, action) {
  if (action.type === PATCH_PREVIEW) {
    return Object.assign({}, state, action.patch);
  } else if (action.type === SET_SOURCE) {
    return Object.assign({}, state, {source: action.source});
  } else if (action.type === SET_RENDERED) {
    return Object.assign({}, state, {rendered: action.rendered});
  } else {
    return state;
  }
}

export function setSource(source) {
  return {
    type: SET_SOURCE,
    source: source
  }
}
export function setRendered(rendered) {
  return {
    type: SET_RENDERED,
    rendered: rendered
  }
}

import {take, dispatch} from "luna-saga";
//var marked = require("marked");

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

var katex = require('katex');

let markdown = new MarkdownIt({
  html: true
});
markdown
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

/* so what does preview do?
 * preview takes in a source, convert it, and then outputs a rendered markdown.
 * What about if you want to turn off a rendering engine? so maybe it is better to
 * put this markdown rendering engine inside a preview/markdown rendering element.
 * The element should take:
 * - markdown source
 * - markdown preview
 * - onChange function => rendered markdown as a parameter
 * */
export function* previewProc() {
  while (true) {
    let {action} = yield take(SET_SOURCE);
    var rendered;
    try {
      rendered = markdown.render(action.source);
    } catch (e) {
      console.log("rendering error", e);
    }
    yield dispatch(setRendered(rendered));
  }
}


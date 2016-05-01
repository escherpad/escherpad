/** Created by ge on 4/9/16. */
import React from 'react';
import ReactDOM from "react-dom";
import {getSelection} from "./dom/getSelection";

import Markdown from '../markdown/Markdown';
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";

import {insertCursor, getCursorStringPosition, getCursorVerticalHeightDifference} from "./dom/cursorHelpers";

const defaultStyle = {
  scrollContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflowY: "auto"
  },
  article: {
    padding: "100px 50px 100% 50px",
    boxSizing: "border-box",
    margin: "0 auto",
    width: "100%",
    maxWidth: "788px",
    left: 0, right: 0,
  }
};
export default class MarkdownPreview extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    agent: React.PropTypes.any.isRequired,
    post: React.PropTypes.any.isRequired,
    onSelect: React.PropTypes.func
  };

  render() {
    let style = this.props.style;
    let post = this.props.post;
    let agent = this.props.agent;
    let sourceWithCursor;
    try {
      sourceWithCursor = insertCursor(post.source, post.presence[agent].cursor);
    } catch (e) {
      // console.log('error: ', e);
      sourceWithCursor = post.source;
    }
    let cursor = {};
    if (this && this.state) cursor = this.state.cursor || {};
    return (
      <div className="markdown-preview scroll-container"
           style={{...defaultStyle.scrollContainer, ...style}}
           onScroll={this.onScroll.bind(this)}>
        <div className="markdown-and-cursor-container" style={{position: "relative"}}>
          <Markdown style={defaultStyle.article}
                    src={sourceWithCursor}
                    async={true}
                    afterRender={this.afterRender.bind(this)}
                    placeholder={"# <em style=\"color: #cfcfcf!important;\">What a lovely day!</em>"}
                    onMouseUp={this.onMouseUp.bind(this)}
          ></Markdown>
          <Cursor className="blinking" {...cursor}></Cursor>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.scrollContainer = ReactDOM.findDOMNode(this);
    this.smoothScroll = new SmoothScroll(this.scrollContainer, {});
  }

  getScrollTop() {
    return this.scrollContainer.scrollTop;
  }

  setCursorTarget(target) {
    if (typeof target === "undefined") return;
    this.setState({cursorTarget: target});
    // scroll to only with valid offset
    if (typeof this.state.cursorScrollOffset !== "undefined") this.scrollCursorTo(this.state.cursorTarget);
  }


  afterRender(markdownElement) {
    this.findCursorString(markdownElement);
    // scroll to only with valid target
    if (typeof this.state.cursorTarget !== "undefined") this.scrollCursorTo(this.state.cursorTarget);
  }

  scrollCursorTo(target, silent = true) {
    var old = this._silent;
    this._silent = silent;
    if (typeof target === 'undefined' || !this.state || typeof this.state.cursorScrollOffset === "undefined") return;
    this.smoothScroll.scrollTo(this.state.cursorScrollOffset - target);
    this._silent = old;
  }

  onMouseUp(e) {
    var onSelect = this.props.onSelect;
    if (!onSelect) return;
    var {anchorNode, anchorOffset} = getSelection();
    var content = anchorNode.textContent;
    var source = this.props.post.source; //post is required so this is fine.
    var lines = source.split("\n");
    lines.forEach((text, index)=> {
      var row = index;
      var textStart = text.indexOf(content);
      if (textStart !== -1) return onSelect({row, column: textStart + anchorOffset});

      if (text.length == 0) return; //avoid this corner case for now.
      try {
        var isSegment = text.indexOf(content);
        if (isSegment !== -1) return onSelect({row, column: isSegment - anchorOffset});
      } catch (e) {
      }
    })
  }

  /**
   * emits filtered scroll events when:
   * 1. not silenced by scroll to
   * 2. smoothScroll is not running (perfectly still)
   * 3. currentScrollTop is more than 0.5 pixel away from smoothScroll target.
   * 4. when onScroll prop is available.
   */
  onScroll(e) {
    let scrollTop = e.target.scrollTop;
    if (this._silent || this.smoothScroll.running || Math.abs(scrollTop - this.smoothScroll.target) <= 0.5 || !this.props.onScroll) return;
    this.props.onScroll(scrollTop);
  }

  findCursorString(markdownElement) {
    var rect = getCursorStringPosition(markdownElement);
    var scrollTop = this.scrollContainer.scrollTop;
    if (typeof rect === "undefined") return;
    this.setState({
      cursor: {
        top: rect.top,
        left: rect.left,
        width: 5,
        height: rect.height
      }
    });
    let cursorScrollOffset = scrollTop + (rect.top + rect.bottom) / 2;
    this.setState({cursorScrollOffset});
  }


}


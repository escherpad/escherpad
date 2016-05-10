/** Created by ge on 4/9/16. */
import React, {Component, PropTypes} from 'react';
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
var {string, func, object} = PropTypes;
export default class MarkdownPreview extends Component {
  static propTypes = {
    agent: string.isRequired,
    post: object.isRequired,
    onSelect: func,
    style: object,
  };

  render() {
    var {style, post, agent} = this.props;
    var sourceWithCursor;
    var {source = ""} = post;
    var {cursor = {row: 0, column: 0}} = ((post.presence || {})[agent] || {});

    // this is a very imperative piece of code.
    /* if source is empty then do not try to find the cursor. */
    if (source.trim() === "") {
      source = "# <em style=\"color: #cfcfcf!important;\">What a lovely day!\nWhy not go ahead, and type away?</em>";
      cursor = {row: 0, column: 40};
    }

    try {
      sourceWithCursor = insertCursor(source, cursor);
    } catch (e) {
      console.log('error: ', e);
      sourceWithCursor = post.source;
    }
    if (this.state) var displayCursor = this.state.cursor || {};
    return (
      <div className="markdown-preview scroll-container"
           style={{...defaultStyle.scrollContainer, ...style}}
           onScroll={this.onScroll.bind(this)}>
        <div className="markdown-and-cursor-container" style={{position: "relative"}}>
          <Markdown style={defaultStyle.article}
                    ref="Markdown"
                    src={sourceWithCursor}
                    async={true}
                    afterRender={this.afterRender.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}
          ></Markdown>
          <Cursor className="blinking" {...displayCursor}></Cursor>
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.setState({
      cursor: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    })
  }

  componentDidMount() {
    this.scrollContainer = ReactDOM.findDOMNode(this);
    this.smoothScroll = new SmoothScroll(this.scrollContainer, {});
    window.addEventListener("reflow", this.forceMarkdownRerender);
  }

  componentWillUnmount() {
    window.removeEventListener("reflow", this.forceMarkdownRerender);
  }

  getScrollTop() {
    return this.scrollContainer.scrollTop;
  }

  forceMarkdownRerender = ()=> {
    this.refs["Markdown"].forceUpdate();
  };

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


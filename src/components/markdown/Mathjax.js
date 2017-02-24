/** Created by ge on 2/19/17. */
import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {resetNumbering} from "./mathjax-config";
import {autobind, throttle} from "core-decorators";
const {string, number, oneOf} = PropTypes;

const delims = {
  inline: ['\\\(', '\\\)'],
  display: ['\\\[', '\\\]'],
};
export default class Mathjax extends Component {
  static propTypes = {
    /** display or inline mode **/
    mode: oneOf(['inline', 'display', null, undefined, '']),
    /** content of the LaTeX string **/
    alt: string,
    /** numbering for the equation **/
    number: number,
  };

  componentDidMount() {
    this.script = ReactDOM.findDOMNode(this.refs.mathScript);
    this.placeholder = ReactDOM.findDOMNode(this.refs.placeholder);
    this.renderMathJax();
  }

  componentWillReceiveProps({alt, mode}) {
    if (alt !== this.props.alt) {
      this.script.innerHTML = alt;
      if (mode === this.props.mode) this.renderMathJax()
    }
  }

  shouldComponentUpdate({mode}) {
    // notice: avoid component flashing when waiting for math to render so *never* update the view.
    // manually set the content of the script and the attribute of the script.
    // Only rerender when display mode has changed.
    return (mode !== this.props.mode);
  }

  componentDidUpdate() {
    this.renderMathJax()
  }

  @autobind
  @throttle(200, {rising: true, trailing: true})
  renderMathJax() {
    // done: infinite retry waiting for MathJax
    if (!window.MathJax || !window.MathJax.isReady && this.retry < 10) {
      this.retry += 1;
      return setTimeout(this.renderMathJax, 3000);
    }
    // done: add placeholder and remove when rendering starts
    window.MathJax.Hub.Queue(() => {
      // todo: implement dynamic throttling.
      this.isRendering = new Date();
      if (typeof this.props.number !== "undefined") resetNumbering(this.props.number);
      this.placeholder.innerHTML = "";
    });
    window.MathJax.Hub.Queue(['Reprocess', MathJax.Hub, this.script]);
    /** put inside the callback after the processing to ensure proper reflow */
    window.MathJax.Hub.Queue(() => {
      this.renderTime = Date.now() - this.isRendering;
      this.isRendering = false;
    });
  }


  render() {
    // todo: might not need display and inline b/c some LaTeX code is automatically display.
    const mathMode = this.props.mode || "inline";
    return <span className={"math-jax-" + mathMode}><span ref='placeholder'>{this.props.alt}</span>
      <script ref="mathScript" type={"math/tex; mode=" + mathMode}
              alt={this.props.alt}>{this.props.alt}</script></span>
  }
}

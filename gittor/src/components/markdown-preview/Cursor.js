/** Created by ge on 4/12/16. */
import React from 'react';
import ReactDOM from 'react-dom';

require('./cursor.scss');
export default class Cursor extends React.Component {
  static propTypes = {
    left: React.PropTypes.number,
    top: React.PropTypes.number,
    height: React.PropTypes.number,
    width: React.PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props) )
  }

  componentDidMount() {
    this.cursorElement = ReactDOM.findDOMNode(this);
    this.parentNode = this.cursorElement.parentNode;
  }

  getStyle() {
    if (!this.parentNode) return {};
    let parentRect = this.parentNode.getBoundingClientRect();
    return {
      top: (this.props.top - parentRect.top) + "px",
      left: (this.props.left - parentRect.left) + "px",
      width: this.props.width + "px",
      height: this.props.height + "px"
    };
  }

  render() {
    var style = this.getStyle();
    return (
      <cursor className="blinking" style={style}></cursor>
    )
  }
}

/** Created by ge on 1/2/17.
 * SizeContainer
 *
 * fits parent responsively, and passes width and height number (in px) to child.
 * */
import React, {Component, PropTypes, cloneElement} from "react";
import ReactDOM from "react-dom";
import {autobind} from "core-decorators";

export default class SizeContainer extends Component {
  static propTypes = {
    container: PropTypes.any
  };

  static defaultProps = {
    container: "div"
  };

  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('reflow', this.resize);
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('reflow', this.resize);
  }

  @autobind
  resize() {
    let node = ReactDOM.findDOMNode(this.refs['container']);
    this.setState({height: node.clientHeight, width: node.clientWidth});
  }

  shouldComponentUpdate(nextState) {
    return nextState !== this.state;
  }

  render() {
    const {container: Container, children, ..._props} = this.props;
    const Child = cloneElement(children, {width: this.state.width, height: this.state.height});
    return <Container ref='container' {..._props}>{Child}</Container>
  }

}

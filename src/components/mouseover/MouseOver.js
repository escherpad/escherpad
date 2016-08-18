/** Created by ge on 4/29/16. */
import React from "react";
import autobind from 'autobind-decorator';
var {node}  = React.PropTypes;
export default class MouseOver extends React.Component {
  static propTypes = {
    children: node
  };

  componentWillMount() {
    this.setState({mouseOver: false})
  }

  @autobind
  onMouseEnter() {
    this.setState({mouseOver: true})
  }

  @autobind
  onMouseLeave() {
    this.setState({mouseOver: false})
  }

  render() {
    var selector = 'data-mouseDefault';
    if (this.state && this.state.mouseOver) selector = "data-mouseOver";
    const {children} = this.props;
    const _children = [].concat(children);
    if (_children.length > 2) console.warn('MouseOver can have only two children. Children after the second are ignored');
    for (var i = 0; i < _children.length; i++) {
      if (_children[i].props[selector])
        return React.cloneElement(
          _children[i],
          {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          }
        );
    }
    return null;
  }
}

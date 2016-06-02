/** Created by ge on 4/29/16. */
import React from "react";
var {node}  = React.PropTypes;
export default class MouseOver extends React.Component {
  static propTypes = {
    children: node
  };

  componentWillMount() {
    this.setState({mouseOver: false})
  }

  onMouseEnter() {
    this.setState({mouseOver: true})
  }

  onMouseLeave() {
    this.setState({mouseOver: false})
  }

  render() {
    var selector = 'mouseDefault';
    if (this.state && this.state.mouseOver) selector = "mouseOver";
    var {children} = this.props;
    children = [].concat(children);
    if (children.length > 2) console.warn('MouseOver can have only two children. Children after the second are ignored');
    for (var i = 0; i < children.length; i++) {
      if (children[i].props[selector])
        return React.cloneElement(
          children[i],
          {
            onMouseEnter: this.onMouseEnter.bind(this),
            onMouseLeave: this.onMouseLeave.bind(this)
          }
        );
    }
    return null;
  }
}

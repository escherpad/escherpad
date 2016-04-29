/** Created by ge on 4/29/16. */
import React from "react";
var {node}  = React.PropTypes;
export default class MouseOver extends React.Component {
  static PropTypes = {
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
    var selector = 'default';
    if (this.state && this.state.mouseOver) selector = "hover";
    var {children} = this.props;
    children = [].concat(children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].ref === selector)
        return React.cloneElement(
          children[i],
          {
            onMouseEnter: this.onMouseEnter.bind(this),
            onMouseLeave: this.onMouseLeave.bind(this),
          }
        );
    }
  }
}

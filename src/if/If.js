/** Created by ge on 4/29/16. */
import React from "react";
var {any, node}  = React.PropTypes;
export default class If extends React.Component {
  static propTypes = {
    data: any,
    children: node
  };

  render() {
    var {data, children} = this.props;
    children = [].concat(children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].props.value === data) return children[i];
    }
    for (var i = 0; i < children.length; i++) {
      if (children[i].props.default) return children[i];
    }
    return (null);
  }
}

/** Created by ge on 4/29/16. */
import React from "react";
var {bool, node}  = React.PropTypes;
export default class If extends React.Component {
  static PropTypes = {
    data: bool,
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
    return (<div>can not find child</div>);
  }
}

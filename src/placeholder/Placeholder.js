/** Created by ge on 4/26/16. */
import React from "react";
var {element} = React.PropTypes;
export default class Placeholder extends React.Component {
  static propTypes = {
    placeholder: element
  };

  render() {
    var {children, placeholder, ...props} = this.props;
    if (!children) return (<div {...props}>{placeholder||""}</div>);
    else return (<div {...props}>{children}</div>);
  }

}

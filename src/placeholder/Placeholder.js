/** Created by ge on 4/26/16. */
import React from "react";
var {any, element} = React.PropTypes;
export default class Placeholder extends React.Component {
  static propTypes = {
    isEmpty: any,
    placeholder: element
  };

  isEmpty(children) {
    var {isEmpty} = this.props;
    if (typeof isEmpty === 'boolean') return this.props.isEmpty;
    else if (typeof isEmpty === 'function') return this.props.isEmpty(children);
    else return (!children)
  }

  render() {
    var {children, placeholder, ...props} = this.props;
    if (this.isEmpty(children)) return (<div {...props}>{placeholder || ""}</div>);
    else return (<div {...props}>{children}</div>);
  }
}

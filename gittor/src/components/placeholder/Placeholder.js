/** Created by ge on 4/26/16. */
import React from "react";
var {any, element} = React.PropTypes;
export default class Placeholder extends React.Component {
  static propTypes = {
    isEmpty: any,
    placeholder: element
  };

  isEmpty(children) {
    const {isEmpty} = this.props;
    if (typeof isEmpty === 'boolean') return isEmpty;
    else if (typeof isEmpty === 'function') return isEmpty(children);
    else return (!children)
  }

  render() {
    var {children, placeholder, isEmpty, ..._props} = this.props;
    if (this.isEmpty(children)) return (<div {..._props}>{placeholder || ""}</div>);
    else return (<div {..._props}>{children}</div>);
  }
}

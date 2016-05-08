/** Created by ge on 5/8/16. */
import React, {Component, PropTypes} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

require('./fade.scss');
var {node} = PropTypes;
export default class Fade extends Component {
  static PropTpes = {
    children: node
  };

  render() {
    var {children, ...props} = this.props;
    return (
      <ReactCSSTransitionGroup transitionName="fade"
                               transitionEnterTimeout={300}
                               transitionLeaveTimeout={300} {...props}
      >{children}</ReactCSSTransitionGroup>
    )
  }
}

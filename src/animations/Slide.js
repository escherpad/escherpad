/** Created by ge on 5/8/16. */
import React, {Component, PropTypes} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

require('./fade-and-slide-down.scss');
var {node} = PropTypes;
export default class Slide extends Component {
  static PropTpes = {
    children: node
  };

  render() {
    var {children, ...props} = this.props;
    return (
      <ReactCSSTransitionGroup transitionName="fade-and-slide-down"
                               transitionEnterTimeout={400}
                               transitionLeaveTimeout={300} {...props}
      >{children}</ReactCSSTransitionGroup>
    )
  }
}

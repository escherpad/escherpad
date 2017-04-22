/** Created by ge on 5/6/16. */
import React, {Component, PropTypes} from "react";

require('./close-button.scss');
var {node, any} = PropTypes;
export default class CloseButton extends Component {
  render() {
    var {...props} = this.props;
    return (
      <i className="modal-close-button material-icons" {...props}>close</i>
    );
  }
}


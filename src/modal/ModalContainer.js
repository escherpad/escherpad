/** Created by ge on 5/7/16. */
import React, {Component, PropTypes, cloneElement} from 'react'

require('./modal.scss');
const {func, node, any} = PropTypes;
export default class Modal extends Component {
  static PropTypes = {
    children: node
  };

  render() {
    var {children} = this.props;
    return (
      <div className="modal-container">
        {children}
      </div>
    );
  }
}


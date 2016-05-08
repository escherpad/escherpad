/** Created by ge on 5/7/16. */
import React, {Component, PropTypes, cloneElement} from 'react'

require('./modal-backdrop.scss');
const {func, node, any} = PropTypes;
export default class ModalBackdrop extends Component {
  static PropTypes = {
    children: node
  };

  render() {
    var {children} = this.props;
    return (
      <div className="modal-backdrop">
        {children}
      </div>
    );
  }
}


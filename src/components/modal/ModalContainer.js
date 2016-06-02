/** Created by ge on 5/7/16. */
import React, {Component, PropTypes, cloneElement} from 'react'

require('./modal.scss');
const {func, node, any} = PropTypes;
export default class Modal extends Component {
  static propTypes = {
    children: node
  };

  render() {
    var {children, ...props} = this.props;
    return (
      <div className="modal-container" {...props}>
        {children}
      </div>
    );
  }
}


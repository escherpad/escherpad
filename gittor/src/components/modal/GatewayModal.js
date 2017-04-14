/** Created by ge on 5/6/16.
 * There are two usages:
 *    One:
 *         <EsModal component={your display component}>
 *             < the content of your modal >
 *         </EsModal>
 *    Two:
 *         <EsModal value={bool}>
 *             < the content of your modal >
 *          </EsModal>
 * */
import React, {Component, PropTypes, cloneElement} from 'react'
import {Gateway} from 'react-gateway';
import ReactModal2 from "react-modal2";
import CloseButton from "./CloseButton";

require('./modal.scss');
const {node, any} = PropTypes;
export default class EsModal extends Component {
  static propTypes = {
    component: node,
    value: any,
    children: node
  };

  componentWillMount() {
    this.setState({isOpen: false});
  }

  componentWillReceiveProps(newProps) {
    var {value} = newProps;
    if (value && (!!value) !== this.state.isOpen) this.setState({isOpen: true});
  }

  onClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  open() {
    this.setState({isOpen: true});
  }

  close() {
    this.setState({isOpen: false});
  }

  render() {
    var {children, value, component, ...props} = this.props;
    var _component;
    if (component && this.state.isOpen) {
      _component = React.cloneElement(component, {onClick: this.open.bind(this), ...props}, [...component.props.children, (
        <Gateway key="modal" into="title-bar-modal">
          <ReactModal2
            closeOnEsc={true}
            onClose={this.close.bind(this)}
            backdropClassName="modal-backdrop"
            modalClassName="modal">
            <CloseButton onClick={this.close.bind(this)}></CloseButton>
            {children}
          </ReactModal2>
        </Gateway>
      )]);

      return _component
    } else if (component && !this.state.isOpen) {
      _component = React.cloneElement(component, {onClick: this.open.bind(this), ...props}, component.props.children);
      return _component;
    } else if (this.state.isOpen) {
      return (
        <Gateway key="modal" into="title-bar-modal">
          <ReactModal2 key=""
                       closeOnEsc={true}
                       onClose={this.close.bind(this)}
                       backdropClassName="modal-backdrop"
                       modalClassName="modal">
            <CloseButton onClick={this.close.bind(this)}></CloseButton>
            {children}
          </ReactModal2>
        </Gateway>
      );
    } else {
      return (null);
    }
  }
}


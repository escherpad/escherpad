/** Created by ge on 5/7/16.
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
import Transition from "react-addons-css-transition-group";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";
import ModalBackdrop from "./ModalBackdrop";
import CloseButton from "./CloseButton";

require('./modal-transitions.scss');
const {func, node, any} = PropTypes;
export default class SimpleModal extends Component {
  static PropTypes = {
    component: node,
    value: any,
    onClose: func.isRequired,
    children: node
  };

  componentWillMount() {
    this.setState({isOpen: false});
  }

  componentWillReceiveProps(newProps) {
    var {value} = newProps;
    if ((!!value) !== this.state.isOpen) this.setState({isOpen: !!value});
  }

  onClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  open() {
    this.setState({isOpen: true});
  }

  close() {
    this.props.onClose();
  }

  render() {
    var {children, value, component, ...props} = this.props;
    var _component, _children;
    if (component) {
      _children = [...component.props.children];
      _children.concat([(
        <ReactCSSTransitionGroup duration={500} enterAnimation="fade" leaveAnimation="fade" easing="ease-out">
          {this.state.isOpen ?
            (<ModalBackdrop key="backdrop"></ModalBackdrop>)
            : []
          }
        </ReactCSSTransitionGroup>
      ), (<ReactCSSTransitionGroup duration={500} enterAnimation="elevator" leaveAnimation="elevator" easing="ease-out">
        {this.state.isOpen ?
          (<ModalContainer key="modal-container">
            <Modal key="modal"
                   closeOnEsc={true}
                   closeOnBackdropClick={true}
                   onClose={this.close.bind(this)}
                   backdropClassName="modal-backdrop"
                   modalClassName="modal">
              <CloseButton onClick={this.close.bind(this)}></CloseButton>
              {children}
            </Modal>
          </ModalContainer>)
          : []}
      </ReactCSSTransitionGroup>)]);
      if (this.state.isOpen) _children.concat([]);

      _component = React.cloneElement(component, {onClick: this.open.bind(this), ...props}, _children);
      return _component
    } else {
      return (
        <div className="modal-component">
          <Transition transitionName="backdrop-fade"
                      transitionEnterTimeout={300}
                      transitionLeaveTimeout={500} {...props}
          >
            {this.state.isOpen ?
              (<ModalBackdrop key="modal-backdrop"></ModalBackdrop>)
              : null
            }
          </Transition>
          <Transition transitionName="modal-fade-and-slide-down"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300} {...props}
          >
            {this.state.isOpen ?
              (<ModalContainer key="modal-container">
                  <Modal
                    closeOnEsc={true}
                    closeOnBackdropClick={true}
                    onClose={this.close.bind(this)}
                    backdropClassName="modal-backdrop"
                    modalClassName="modal">
                    <CloseButton onClick={this.close.bind(this)}></CloseButton>
                    {children}
                  </Modal>
                </ModalContainer>
              ) : null}
          </Transition>
        </div>
      );
    }
  }
}


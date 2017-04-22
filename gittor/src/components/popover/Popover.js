/** Created by ge on 5/5/16. */
import React, {PropTypes, Component, cloneElement} from 'react'
import FlipMove from "react-flip-move";

require('./popover.scss');

const {node, any} = PropTypes;
export default class Popover extends Component {
  static propTypes = {
    component: node,
    children: node.isRequired,
    collapseOnMouseLeave: any
  };

  componentWillMount() {
    this.setState({isOpen: false, isMouseOver: false});
  }

  onClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  onMouseOver() {
    this.setState({isMouseOver: true});
  }

  onMouseLeave() {
    // only close if state is open
    if (this.state.isMouseOver) this.setState({isOpen: false, isMouseOver: false});
  }

  render() {
    var {component, children, collapseOnMouseLeave, ...props} = this.props;
    var {isOpen} = this.state;
    props.onClick = this.onClick.bind(this);

    var popoverProps = {};
    if (collapseOnMouseLeave) {
      popoverProps.onMouseOver = this.onMouseOver.bind(this);
      popoverProps.onMouseLeave = this.onMouseLeave.bind(this);
    }
    // FlipMove has to be position: relative, therefore we need a
    // position: absolute container
    var popover =
      <FlipMove
        duration={150}
        enterAnimation="fade"
        leaveAnimation="fade"
        easing="ease-out"
      >
        {isOpen ? [].concat(
          <div key="popover-container"
               className="popover-container" {...popoverProps}>
            {children}
          </div>) : []}
      </FlipMove>;
    var _component = cloneElement(component, props, component.props.children);
    return (
      <div className="popover" key="popover">
        {_component}
        {popover}
      </div>
    );
  }
}

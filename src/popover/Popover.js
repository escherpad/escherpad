/** Created by ge on 5/5/16. */
import React, {PropTypes, Component} from 'react'
import FlipMove from "react-flip-move";
import If from "../if/If";


require('./popover.scss');
const {node, array} = PropTypes;
export default class Popover extends Component {
  static propTypes = {
    children: node,
    menuItems: array
  };

  componentWillMount() {
    this.setState({isOpen: false});
  }

  onClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  onMouseLeave() {
    this.setState({isOpen: false});
  }

  renderItem(item) {
    var {icon, text, ...props} = item;
    return (
      <div className="popover-menu-item" key={text} {...props}>
        <i className="material-icons">{icon}</i>
        {text}
      </div>
    )
  }

  render() {
    var {children, menuItems=[]} = this.props;
    var {isOpen} = this.state;
    var popover;
    if (isOpen) popover = [(
      <div className="popover-container" key="popover-container">
        {menuItems.map(this.renderItem.bind(this))}
      </div>
    )];
    return (
      <div className="popover" onClick={this.onClick.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        {children}
        <FlipMove duration={150} enterAnimation="fade" leaveAnimation="fade" easing="ease-out">
          {popover}
        </FlipMove>
      </div>
    )
  }

}

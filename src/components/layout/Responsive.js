/** Created by ge on 4/28/16.
 * Takes in a list of breakPoints.
 * When the window/container width is wider than the largest break-point,
 * pick the children with "default" key.
 * */
import React from "react";
var {any, node, string, number, bool} = React.PropTypes;
export default class Responsive extends React.Component {
  static propTypes = {
    breakPoints: any,
    children: node,
    fill: any
  };

  componentWillMount() {
    var orderedBreakPoints = this.orderBreakPoints();
    var width = this.getWidth();
    this.getBreakRange(orderedBreakPoints, width);
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.breakPoints !== newProps.breakPoints) this.orderBreakPoints(newProps);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  getWidth() {
    var {fill, height} = this.props;
    var width;
    if (fill) {
      if (height) width = this.refs.container.clientHeight;
      else width = this.refs.container.clientWidth;
    } else {
      if (this.props.height) width = window.innerHeight;
      else width = window.innerWidth;
    }
    this.setState({width});
    return width;
  }

  onResize = ()=> {
    var width = this.getWidth();
    this.getBreakRange(this.state.orderedBreakPoints, width);
  };

  orderBreakPoints(newProps) {
    var {breakPoints} = newProps || this.props;
    var orderedBreakPoints = Object.keys(breakPoints)
      .map((k)=>({breakPoint: breakPoints[k], breakKey: k}))
      .sort(function (a, b) {
        return (a.breakKey - b.breakKey);
      });
    this.setState({orderedBreakPoints});
    return orderedBreakPoints;
  }

  getBreakRange(orderedBreakPoints, width) {
    // breakPoints are sorted to be ascending
    if (orderedBreakPoints.length === 0) {
      return this.setState({breakKey: "default"});
    }
    for (var i = 0; i < orderedBreakPoints.length; i++) {
      if (width <= orderedBreakPoints[i].breakPoint) {
        this.setState({breakKey: orderedBreakPoints[i].breakKey});
        return;
      }
    }
    this.setState({breakKey: "default"});
  }

  renderChild() {
    var {children} = this.props;
    var {breakKey} = this.state || {};
    var _children = [].concat(children);
    for (var key in children) {
      if (children[key].props[breakKey]) return (children[key]);
    }
    return (<div>no child found</div>);
  }

  render() {
    var {fill} = this.props;
    if (fill) {
      return (
        <div ref="container">
          {this.renderChild()}
        </div>
      );
    } else {
      return (this.renderChild());
    }
  }
}

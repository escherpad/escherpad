/** Created by ge on 4/27/16. */
import React from "react";
import ReactDOM from "react-dom";
import FlexItem from "./FlexItem";

var {string, bool, func, any, node,} = React.PropTypes;
export default class FlexHide extends React.Component {
  static propTypes = {
    // fixed: any.isRequired,
    hide: bool,
    width: any.isRequired,
    transition: string,
    children: node,
    onTransitionEnd: func
  };

  componentWillMount() {
    var {hide} = this.props;
    this.setState({show: !hide, entering: !hide, leaving: hide, init: true});
  }

  componentDidMount() {
    this.innerContainer = ReactDOM.findDOMNode(this.refs["DIV"]);
    window.addEventListener("resize", this.getContainerWidth);
    this.getContainerWidth();
  }

  componentWillReceiveProps(newProps) {
    var {hide, width, children} = newProps;
    if (this.props.hide && !hide) this.setState({show: true, entering: true, leaving: false, init: true});
    if (!this.props.hide && hide) this.setState({leaving: true, entering: false, init: true});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getContainerWidth);
  }

  onTransitionEnd = (e)=> {
    this.setState({show: !this.props.hide, entering: false, leaving: false});
    if (typeof this.props.onTransitionEnd === "function") this.props.onTransitionEnd(e);
    this.getContainerWidth()
  };

  getContainerWidth = ()=> {
    this.setState({flexContainerWidth: ReactDOM.findDOMNode(this.refs["FlexItem"]).clientWidth});
  };

  render() {
    var {hide, width, style, transition="width 0.3s ease-out", children, onTransitionEnd, ...props} = this.props;
    var _style = {...style, position: "relative", transition};
    var _innerTransition = "opacity 0.3s ease-out";

    var _props = {...props, onTransitionEnd: this.onTransitionEnd};
    var {show, entering, leaving, init, flexContainerWidth} = this.state;
    if (show && typeof flexContainerWidth === 'undefined') { // initial rendering shown
      let innerStyle = {
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        transition: _innerTransition
      };
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  width={width}
                  style={style}>
          <div ref="DIV" style={innerStyle}>{children}</div>
        </FlexItem>
      );
    } else if (!show && typeof flexContainerWidth === 'undefined') { // initial rendering hidden
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  fixed width={"0px"}
                  ref="FlexItem">
          <div ref="DIV" style={{transition:_innerTransition}}></div>
        </FlexItem>
      );
    } else if (!show) {
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  fixed width={"0px"}
                  ref="FlexItem">
          <div ref="DIV"></div>
        </FlexItem>
      );
    } else if (show && leaving && init) {
      let innerStyle = {
        transition: _innerTransition,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: flexContainerWidth + "px"
      };
      setTimeout(()=> {
        this.setState({init: false});
      }, 0);
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  fixed
                  width={flexContainerWidth + "px"}
                  style={style}>
          <div ref="DIV"
               style={innerStyle}>{children}</div>
        </FlexItem>
      );
    } else if (show && leaving) {
      let innerStyle = {
        transition: _innerTransition,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: flexContainerWidth + "px"
      };
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  fixed
                  width={"0px"}
                  style={_style}>
          <div ref="DIV"
               style={{...innerStyle, opacity: 0}}>{children}</div>
        </FlexItem>
      );
    } else if (show && entering && init) {
      let innerStyle = {
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: "100%",
        minWidth: width,
        opacity: 0
      };
      setTimeout(()=> {
        this.setState({init: false});
      }, 0);
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  width={width}
                  style={_style}>
          <div ref="DIV"
               style={innerStyle}>{children}</div>
        </FlexItem>
      );
    } else if (show && entering) {
      let innerStyle = {
        position: "absolute", top: 0, bottom: 0, right: 0,
        transition: _innerTransition,
        width: "100%",
        minWidth: width,
        opacity: 1
      };
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  width={width}
                  style={_style}>
          <div ref="DIV"
               style={innerStyle}>{children}</div>
        </FlexItem>
      );
    } else if (show) {
      let innerStyle = {
        position: "absolute", top: 0, bottom: 0, right: 0,
        opacity: 1,
        transition: _innerTransition,
        width: flexContainerWidth + "px"
      };
      return (
        <FlexItem key={"flex-hide-item"} {..._props}
                  ref="FlexItem"
                  width={width}
                  style={_style}>
          <div ref="DIV" style={innerStyle}>{children}</div>
        </FlexItem>
      );
    }
  }
}

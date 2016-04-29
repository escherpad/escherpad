/** Created by ge on 4/27/16. */
import React from "react";
import ReactDOM from "react-dom";
import FlexItem from "./FlexItem";

var {any, node, string, bool} = React.PropTypes;
export default class FlexHide extends React.Component {
  static propTypes = {
    key: string,
    fixed: any.isRequired,
    hide: bool,
    width: any.isRequired,
    transition: string,
    children: node
  };

  componentDidMount() {
    var {width} = this.props;
    this.FlexItem.setWidth(width);
    this.innerContainer = ReactDOM.findDOMNode(this.DIV);
  }

  componentWillReceiveProps(newProps) {
    var {hide, width, children} = newProps;
    var opacity = 1;
    if (hide) {
      width = "0px";
      opacity = 0;

      // this need to run after the timeout
      children = [];
    }
    this.innerContainer.style.opacity = opacity;
    this.FlexItem.setWidth(width);
  }

  render() {
    var {key, fixed, hide, width, style, transition="all 0.6s ease-out", children, ...props} = this.props;
    var thisStyle = {...style, transition};
    return (
      <FlexItem key={"flex-item:" + key}
                ref={(_)=>this.FlexItem=_}
                fixed={fixed}
                style={thisStyle} {...props}
      ><div ref={(_)=>this.DIV=_}
             style={{position: "absolute", top: 0, right: 0, bottom: 0, width, transition: "all 0.2s ease-out"}}
        >{children}</div>
      </FlexItem>
    )
  }


}

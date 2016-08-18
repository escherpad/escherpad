/** Created by ge on 4/25/16. */
import React from "react";
import autobind from 'autobind-decorator';
import MouseOver from "../mouseover/MouseOver";
import If from "../If";
import {FlexItem} from 'layout-components';

const style = {
  color: "#cfcfcf",
  fontSize: "40px",
  transition: "all 0.3s linear"
};
const hover = {
  color: "#23aaff",
  fontSize: "40px",
  transition: "all 0.3s linear",
  textShadow: "0 0 3px #23aaff"
};

var {any, func} = React.PropTypes;
export default class FullScreenToggleButton extends React.Component {
  static propTypes = {
    viewMode: any,
    dispatch: func.isRequired
  };

  @autobind
  onClick() {
  }

  @autobind
  setZenMode() {
    var {dispatch} = this.props;
    dispatch({type: "SET_ZEN_MODE"})
  }

  @autobind
  setFullView() {
    var {dispatch} = this.props;
    dispatch({type: "SET_FULL_VIEW"})
  }

  render() {
    const {viewMode} = this.props;
    return (
      <FlexItem fixed style={{"padding": "0 4px", "cursor":"pointer", "height":"40px"}} onClick={this.onClick}>{
        (viewMode === 'zen-mode') ?
          <MouseOver>
            <i data-mouseDefault className="material-icons select-zen-mode" style={style}>fullscreen</i>
            <i data-mouseOver className="material-icons select-full-view" style={hover}
               onClick={this.setFullView}>fullscreen_exit</i>
          </MouseOver> :
          <MouseOver>
            <i data-mouseDefault className="material-icons select-full-view" style={style}>fullscreen_exit</i>
            <i data-mouseOver className="material-icons select-zen-mode" style={hover}
               onClick={this.setZenMode}>fullscreen</i>
          </MouseOver>
      }</FlexItem>
    )
  }
}

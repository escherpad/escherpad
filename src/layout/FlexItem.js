/** Created by ge on 4/24/16. */
import React from 'react';

import {flexFluid, flexFixed} from "./style-globals";

const styles = {};

export default class FlexItem extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    children: React.PropTypes.any
  };

  render() {
    var flexStyle, style;
    style = this.props.style || {};
    if (this.props.fluid) flexStyle = flexFluid;
    if (this.props.fixed) flexStyle = flexFixed;
    let children = this.props.children || [];
    return (
      <div {...this.props} style={{...flexStyle, ...style}}>
        {children}
      </div>
    )
  }
}

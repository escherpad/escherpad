/** Created by ge on 5/1/16. */
import React from "react";
import FlexItem from "../layout/FlexItem";
import Dropdown from "../dropdown/Dropdown";

require('./order-by-dropdown.scss');
const options = [
  {value: "createdAt", label: "Created"},
  {value: "modifiedAt", label: "Recent"}
];
var {func, any} = React.PropTypes;
export default class OrderBySelection extends React.Component {
  static propTypes = {
    orderBy: any,
    dispatch: func.isRequired,
  };

  onSelect(value, selected) {
    this.props.dispatch({
      type: "ORDER_POST_BY",
      orderBy: value
    })
  }

  render() {
    var {orderBy} = this.props;
    return (
      <FlexItem fixed style={{paddingRight: "4px"}}>
        <Dropdown value={orderBy}
                  style={{fontStyle: "italic", display: "inline-block", lineHeight: "20px"}}
                  baseClassName="order-by-dropdown"
                  options={options}
                  onChange={this.onSelect.bind(this)}
                  placeholder="What do you want to see?"/>
        <i className="material-icons"
           style={{
                display: "inline",
                fontSize: "11px",
                lineHeight: "20px"
            }}
        >keyboard_arrow_down</i>
      </FlexItem>
    )
  }
}

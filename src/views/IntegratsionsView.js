/** Created by ge on 5/28/16. */
import React, {Component, PropTypes} from "react";
import Flex from "../components/layout/Flex"
import FlexItem from "../components/layout/FlexItem"

const {any, object} = PropTypes;
export default class IntegratsionsView extends Component {
  static propTypes = {
    location: any,
    params: any,
    store: any.isRequired
  };

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }
  // information hierarchy:
  //        Apps:
  //        configurations:

  render() {
    return (
      <Flex column fill>
        <FlexItem fixed className="menu-bar">Accounts</FlexItem>
        <FlexItem fluid className="body-container">
          <h1>Manage Your Service Backends</h1>
          <h4>Apps and Services</h4>
          <h4>Connected Accounts</h4>
        </FlexItem>
      </Flex>
    );
  }
}


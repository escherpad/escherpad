import React, {Component, PropTypes} from "react";
import {autobind} from "core-decorators";
import {Row} from 'layout-components';
import TwoColumn from "../../../two-column/TwoColumn";
import Badge from "../../../../components/badge/Badge";
import TextShadow from "../../../styling/TextShadow";

require("./connect-to-service.scss");

import dapi from "../../../../modules/dropbox";
export default class ConnectToService extends Component {

  static propTypes = {dispatch: PropTypes.func, store: PropTypes.object};

  @autobind
  linkDropbox(event) {
    event.stopPropagation();
    let path = dapi.requestAuth(null);
  };

  render() {
    let {dispatch, ..._props} = this.props;

    return (
      <div className="connect-to-service">
        <Row component="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
          color="#23aaff"><span>Configure New</span></TextShadow></Row>
        <TwoColumn className="connect-to-service-item"
                   col1={"Dropbox"}
                   col2={(
                     <Badge text="connect via OAuth"
                            onClick={this.linkDropbox}
                            style={{backgroundColor: "#23aaff", color: "white"}}/>
                   )}/>
        <Row component="p">After authorization, Gittor will gain access to your dropbox.</Row>
      </div>
    );
  }
}

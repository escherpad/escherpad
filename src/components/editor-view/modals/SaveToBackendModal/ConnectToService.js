import React from "react";
import {Row} from 'layout-components';
import TwoColumn from "../../../two-column/TwoColumn";
import Badge from "../../../../components/badge/Badge";
import TextShadow from "../../../styling/TextShadow";

require("./connect-to-service.scss");

import dapi from "../../../../modules/dropbox";
export default function ConnectToService({dispatch, ..._props}) {

  function linkDropbox(event) {
    event.stopPropagation();
    dapi.requestAuth();
  }

  return (
    <div className="connect-to-service">
      <Row tagName="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
        color="#23aaff"><span>Configure New</span></TextShadow></Row>
      <TwoColumn className="connect-to-service-item"
                 col1={"Dropbox"}
                 col2={(
                     <Badge text="connect via OAuth"
                            onClick={linkDropbox}
                            style={{backgroundColor: "#23aaff", color: "white"}}/>
                 )}/>
      <Row tagName="p">After authorization, Gittor will gain access to your dropbox.</Row>
    </div>
  );
}

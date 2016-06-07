import React from "react";
import TwoColumn from "../../../two-column/TwoColumn";
import Row from "../../../../components/layout/Row";
import Badge from "../../../../components/badge/Badge";
import TextShadow from "../../../styling/TextShadow";

require("./connect-to-service.scss");

export default function ConnectToService({dispatch, dropboxApi, ..._props}) {

  function linkDropbox(event) {
    event.stopPropagation();
    dropboxApi.requestToken();
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
                            style={{backgroundColor: "#23aaff", color: "white"}}></Badge>
                 )}
      ></TwoColumn>
      <Row tagName="p">{"" +
      "Important: Gittor only get access to the folder Dropbox/Apps/Gittor. It will not have access to your existing folders in Dropbox."}</Row>
    </div>
  );
}

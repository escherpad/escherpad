import React, {PropTypes} from "react";
import {Row} from 'layout-components';
import TextShadow from "../../../styling/TextShadow";

import AccountListView from "../../../account-list-view/AccountListView";

function ChooseAService(props) {
  return (
    <div>
      <Row tagName="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
        color="#23aaff"><span>Save To...</span></TextShadow></Row>
      <AccountListView {...props}/>
    </div>);
}

ChooseAService.proptypes = {};
export default  ChooseAService;

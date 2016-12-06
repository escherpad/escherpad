import React from "react";
import {Row} from 'layout-components';
import TextShadow from "../../../styling/TextShadow";

import AccountListView from "../../../account-list-view/AccountListView";

export default function ChooseAService({accountList, ..._props}) {
  return (
    <div>
      <Row tagName="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
        color="#23aaff"><span>Save To...</span></TextShadow></Row>
      <AccountListView accountList={accountList} {..._props}/>
    </div>);
}

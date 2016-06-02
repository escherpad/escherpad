import React from "react";
import AccountListItem from "./AccountListItem";

export default function AccountListView(props) {
  "use strict";
  var {accountList=[], post, dispatch} = props;
  return (
    <div className="account-list-view">
      {accountList.map((account)=>{
        var key = `${account.service}:${+account.uid}`;
        return (
          <AccountListItem key={key} post={post} account={account} dispatch={dispatch}></AccountListItem>
        );
      })}
    </div>
  );
};

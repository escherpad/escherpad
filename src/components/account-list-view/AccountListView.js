import React, {Component} from "react";
import autobind from "autobind-decorator";
import Selector from "../../lib/Selector";
import AccountEntryWithExpandableBrowser from "./AccountEntryWithExpandableBrowser";

class AccountListView extends Component {

  render() {
    let {post, accountList = [], ..._props} = this.props;
    return (
      <div className="account-list-view">
        {accountList.map((account)=> {
          return <AccountEntryWithExpandableBrowser key={`${account.service}:${account.uid}`}
                                                    post={post}
                                                    account={account}
                                                    {..._props}/>;
        })}
      </div>
    );
  };
}

export default Selector((store)=> {
  "use strict";
  return {
    accountList: Object.keys(store.accounts).map(k=> {
      return store.accounts[k]
    }),
  };
}, AccountListView)

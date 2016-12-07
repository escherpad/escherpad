/** Created by ge on 12/6/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import autobind from "autobind-decorator";
import AccountListItem from "./AccountListItem";
import BrowserColumnView from "./BrowserColumnView";

let {any} = PropTypes;
const propTypes = {
  account: any,
  accountBrowser: any
};
class AccountEntryWithExpandableBrowser extends Component {

  @autobind
  removeAccount() {
    this.props.dispatch({
      type: "DELETE_ACCOUNT",
      account: this.props.account
    });
  }

  @autobind
  onClick() {
    this.props.dispatch({
      type: "ACCOUNT_BROWSER_OPEN",
      account: this.props.account
    });
    this.props.dispatch({
      type: "account_browser"
    })
  }

  @autobind
  _close() {
    this.props.dispatch({
      type: "ACCOUNT_BROWSER_CLOSE"
    });
  }

  @autobind
  onSelect() {
    this._close();
  }

  @autobind
  onSubmit() {
    this._close();
  }

  render() {

    let {account, accountBrowser, ..._props} = this.props;

    let item = <AccountListItem account={account}
                                onDelete={this.removeAccount}
                                onClick={this.onClick}/>;

    if (accountBrowser.open && accountBrowser.accountId == account.uid) {
      return <div className="account-list-item-expanded">
        {item}
        <BrowserColumnView title={account.title}
                           breadCrumb={accountBrowser.cwd}
                           items={accountBrowser.list}
                           searchQuery={null}
                           backButtonText="back"
                           onSelect={(rootPath)=> {
                             // get rid of all set state.
                             this.setState({rootPath})
                           }}
                           onQueryUpdate={()=> {
                           }}
                           onClick={()=> {
                           }}
                           onSubmit={this.onSubmit}
                           {..._props}
        />
      </div>
    } else {
      return item;
    }
  }

}
AccountEntryWithExpandableBrowser.propTypes = propTypes;
export default Selector((store)=> {
  "use strict";
  console.log(store.accountBrowser);
  return {
    accountBrowser: store.accountBrowser
  };
}, AccountEntryWithExpandableBrowser)

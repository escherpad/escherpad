/** Created by ge on 12/6/16. */
import React, {Component, PropTypes} from "react";
import {Row} from "layout-components";
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
    let {post, account, accountBrowser} = this.props;
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: post.id,
        account: {
          service: account.service,
          uid: account.uid
        },
        path: accountBrowser.cwd
      }
    });
    this._close();
  }

  render() {

    let {post, account, accountBrowser, ..._props} = this.props;

    let item = <AccountListItem account={account}
                                onDelete={this.removeAccount}
                                onClick={this.onClick}/>;

    if (accountBrowser.open && accountBrowser.accountId == account.uid) {
      return <div className="account-list-item-expanded">
        {item}
        <BrowserColumnView title={account.title}
                           account={account}
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
                           {..._props}
        />
        <Row className="footer">
          <button onClick={this.onSubmit}>submit</button>
        </Row>
      </div>
    } else {
      return item;
    }
  }

}
AccountEntryWithExpandableBrowser.propTypes = propTypes;
export default Selector((store)=> {
  "use strict";
  return {
    accountBrowser: store.accountBrowser
  };
}, AccountEntryWithExpandableBrowser)

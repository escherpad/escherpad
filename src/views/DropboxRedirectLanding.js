/** Created by ge on 5/14/16. */
import React, {Component, PropTypes} from "react";
import {parseTokenQueryString} from "./../services/dropboxApi";
import AccountsListContainer from "../store/accounts/AccountsListContainer";
import AccountListView from "../components/account-list-view/AccountListView";

const {any, object} = PropTypes;
export default class DropoxRedirectLanding extends Component {
  static propTypes = {
    location: any,
    params: any,
    store: any.isRequired,
    dropboxApi: any.isRequired,

  };

  componentWillMount() {
    var {store} = this.props;
    var dispatch = store.dispatch.bind(store);


    var {hash, accessToken, tokenType, uid, state} = parseTokenQueryString();

    var action = {
      type: "UPSERT_ACCOUNT",
      account: {service: "dropbox", uid, accessToken, tokenType}
    };
    dispatch(action)
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div>
        <h1>Your Dropbox Account Is Linked!</h1>
        <h2>Accounts</h2>
        <p>You are now connected to the folder:&nbsp;
          <strong>
            Dropbox
            <i className="material-icons">chevron_right</i>
            Apps
            <i className="material-icons">chevron_right</i>
            Gittor
          </strong> for the following accounts: </p>
        <AccountsListContainer {...this.props} component={AccountListView}></AccountsListContainer>
      </div>
    );
  }
}

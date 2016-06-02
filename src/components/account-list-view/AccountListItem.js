/** Created by ge on 5/30/16. */
import React, {Component, PropTypes} from "react";
import Row from "../layout/Row";
import Width from "../layout/Width";
import MouseOver from "../mouseover/MouseOver";

import {getFolders} from "../../services/dropboxApi";

require('./account-list-view.scss');

const {object, func} = PropTypes;
export default class ListItem extends Component {
  static propTypes = {
    account: object,
    post: object,
    dispatch: func
  };

  removeAccount() {
    var {post, account, dispatch} = this.props;
    var action = {
      type: "DELETE_ACCOUNT",
      account: account
    };
    dispatch(action);
  }

  selectAccount() {
    var {post, account, dispatch} = this.props;
    console.log(account);

    getFolders('', account.accessToken).then(data=>{
      console.log(data);
    });

    var action = {
      type: "UPSERT_BINDR",
      bindr: {
        // path: to the dropbox folder
      }
    };
    dispatch(action);
  }


  render() {
    var {post, account, dispatch} = this.props;
    return (
      <Row tagName="div" className="account-list-item"
           onClick={this.selectAccount.bind(this)}
      >
        <Width width="40%" style={{textAlign: "right", paddingRight: "10px"}}>
          <div>Dropbox Account:</div>
        </Width>
        <Width tagName="div" width="60%" style={{paddingLeft: "10px"}}>
          <button className="account-badge"
          >{(account.email || "email is not available")}
            <MouseOver>
              <i mouseOver className="material-icons" onClick={this.removeAccount.bind(this)}>cancel</i>
              <i mouseDefault className="material-icons">clear</i>
            </MouseOver>
          </button>
        </Width>
      </Row>
    )
  }
}

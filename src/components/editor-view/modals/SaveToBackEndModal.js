/** Created by ge on 5/8/16. */
import React, {Component, PropTypes} from "react";
import Row from "../../layout/Row";
import Width from "../../layout/Width";
import Flex from "../../layout/Flex";
import FlexItem from "../../layout/FlexItem";
import Height from "../../styling/Height";
import TextShadow from "../../styling/TextShadow";
import Size from "../../styling/Size";

import SimpleModal from "../../modal/SimpleModal";
import Input from "../../form/Input";
import Select from "../../form/Select";
import AccountListContainer from "../../../store/accounts/AccountsListContainer";
import AccountListView from "../../account-list-view/AccountListView";

require('./modal-form.scss');
var {any, func} = PropTypes;
export default class SaveToBackEndModal extends Component {
  static propTypes = {
    options: any,
    dispatch: func.isRequired,
    dropboxApi: any.isRequired
  };

  render() {
    var {value, options={}, dispatch, ...props} = this.props;
    return (
      <SimpleModal value={value} {...props}>
        <Flex column fill>
          <FlexItem fixed>
            <div className="modal-header">
              <h2>
                Save Note&nbsp;
                <span className="hint">to GitHub, Dropbox and so on...</span>
                {/*Settings for:&nbsp;
                 <span style={{color: "#23aaff"}}>{title}</span>*/}
              </h2>
            </div>
          </FlexItem>
          <FlexItem fixed className="modal-body">
            <Row className="description" style={{marginTop: "24px"}}><p>
              Gittor is designed to be a server-less web app. So to save your notes permanently, you need to choose
                a storage service.</p></Row>
            <Row><p>
              Each document can only be saved to one storage service. To choose a service that is already connected, click on an account below.
            </p></Row>
            <Row><Size size="22px"><TextShadow color="#23aaff"><span>
              Meta Data
            </span></TextShadow></Size></Row>
            <Row><span>
              this file is located at: /test_folder2/new_file.json.
              <br/>
              the file ID is :id:lkshsfD8d02ndQx
            </span></Row>
            <Row><Size size="22px"><TextShadow color="#23aaff"><span>
              Save To...
            </span></TextShadow></Size></Row>
            <AccountListContainer {...props} component={AccountListView}></AccountListContainer>
            <Row><Size size="22px"><TextShadow color="#23aaff"><span>
              Configure New
            </span></TextShadow></Size></Row>
            <Row tagName="div" style={{marginTop: "14px"}}>
              <Width width="40%" style={{textAlign: "right", paddingRight: "10px"}}>
                <div>Connect To Dropbox</div>
              </Width>
              <Width width="60%" tagName="div" style={{paddingLeft: "10px"}}>
                <button onClick={this.linkDropbox.bind(this)}
                        style={{color: "white", backgroundColor: "#007ee5", border: "none", borderRadius: "3px", cursor: "pointer"}}
                >Authorize Via OAuth
                </button>
              </Width>
            </Row>
          </FlexItem>
        </Flex>
      </SimpleModal>);
  }

  onChange(key) {
    var {options, dispatch} = this.props;
    return function (accountId) {
      var action = {
        type: "UPDATE_POST",
        post: {
          backend: {
            id: accountId
          }
        }
      };
      dispatch(action);
    }
  }

  linkDropbox(event) {
    event.stopPropagation();
    var {dropboxApi} = this.props;
    dropboxApi.requestToken();
  }

}

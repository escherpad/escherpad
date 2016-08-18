/** Created by ge on 5/8/16. */
import React, {Component, PropTypes} from "react";
import {Row, Flex, FlexItem} from 'layout-components';
import If from "../../../If";

import SimpleModal from "../../../modal/SimpleModal";

import ConnectToService from "./ConnectToService";
import ChooseAService from "./ChooseAService";
import PostServiceInfoView from "./PostServiceInfoView";
require('./../modal-form.scss');

const {any, func, array} = PropTypes;
export default class SaveToBackendModal extends Component {
  static propTypes = {
    options: any,
    accountList: array.isRequired,
    dispatch: func.isRequired
  };

  render() {
    const {post, accountList} = this.props;
    let view;
    if (accountList.length == 0) {
      view = "no-services-available";
    } else if (!post.service) {
      view = "choose-a-service";
    } else {
      view = "has-service";
    }

    const {value, ..._props} = this.props;
    return (
      <SimpleModal value={value} {..._props}>
        <Flex column fill>
          <FlexItem fixed>
            <div className="modal-header">
              <h2>Save Note&nbsp;
                <span className="hint">to GitHub, Dropbox and so on...</span>
              </h2>
            </div>
          </FlexItem>
          <FlexItem fixed className="modal-body">
            <If ifData={view}>
              <div data-ifValue="no-services-available">
                <Row tagName="p" className="intro" style={{marginTop: "24px"}}>
                  {"To save your note, Gittor need to connect to a service via OAuth."}
                </Row>
                <ConnectToService {..._props}/>
              </div>
              <div data-ifValue="choose-a-service">
                <ChooseAService {..._props}/>
                <ConnectToService {..._props}/>
              </div>
              <div data-ifValue="has-service">
                <PostServiceInfoView {..._props}/>
              </div>
            </If>
          </FlexItem>
        </Flex>
      </SimpleModal>);
  }

  onChange(key) {
    var {options, dispatch} = this.props;
    return function (accountId) {
      dispatch({
        type: "UPDATE_POST",
        post: {
          backend: {
            id: accountId
          }
        }
      });
    }
  }
}

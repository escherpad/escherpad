/** Created by ge on 5/12/16. */
import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {FlexItem} from "layout-components";
import BlueBadge from "../badge/BlueBadge";
import SaveToBackendModal from "./modals/save-to-backend/SaveToBackEndModal";
import {getServiceFromAccountKey} from "../../store/accounts/accounts";

require('./save-to-backend-badge.scss');

const {any, func} = PropTypes;
export default class BackEndBadge extends Component {

  static propTypes = {
    post: any,
    dispatch: func.isRequired,
    style: any
  };

  render() {
    const {store, dispatch, ..._props} = this.props;
    let {post} = this.props;
    return (
      <span>
        {(post.accountKey) ?
          [<BlueBadge onClick={this.openModal}>{getServiceFromAccountKey(post.accountKey)}</BlueBadge>,
            <span style={{color: "#23aaff", fontSize: "12px", lineHeight: "20px", margin: "10px 2px 0px"}}>:/</span>] :
          <button className="save-to-backend-badge" onClick={this.openModal}>
            save to...
          </button>
        }
        <SaveToBackendModal store={store}
                            dispatch={dispatch}
                            onClose={this.closeModal}
                            {..._props}/>
      </span>
    )
  }

  getServiceFromAccountKey(accountKey) {

  }

  @autobind
  openModal() {
    this.props.dispatch({
      type: "POST_SAVE_MODAL_OPEN"
    });
  }

  @autobind
  closeModal() {
    this.props.dispatch({
      type: "POST_SAVE_MODAL_CLOSE"
    });
  }

}

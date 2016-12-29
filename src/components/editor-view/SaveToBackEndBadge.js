/** Created by ge on 5/12/16. */
import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {FlexItem} from "layout-components";
import BlueBadge from "../badge/BlueBadge";
import SaveToBackendModal from "./modals/SaveToBackendModal/SaveToBackendModal";
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
          <BlueBadge onClick={this.openModal}>{getServiceFromAccountKey(post.accountKey)}:{post.path}</BlueBadge> :
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

/** Created by ge on 5/12/16. */
import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import {FlexItem} from "layout-components";
import BlueBadge from "../badge/BlueBadge";
import SaveToBackendModal from "./modals/SaveToBackendModal/SaveToBackendModal";

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
        {(post.account && post.account.service) ?
          <BlueBadge onClick={this.openModal}>{post.account.service}:{post.path}</BlueBadge> :
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

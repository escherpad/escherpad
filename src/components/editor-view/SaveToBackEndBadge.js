/** Created by ge on 5/12/16. */
import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import {FlexItem} from "layout-components";
import AccountListContainer from "../../store/accounts/AccountsListContainer";
import SaveToBackendModal from "./modals/SaveToBackendModal/SaveToBackendModal";

require('./save-to-backend-badge.scss');

const {any, func} = PropTypes;
export default class BackEndBadge extends Component {

  static propTypes = {
    post: any,
    account: any,
    dispatch: func.isRequired,
    style: any
  };

  render() {
    const {store, post, dispatch, ..._props} = this.props;
    const {modalOpen} = this.state;
    return (
      <FlexItem fixed style={{"padding": "0 5px"}}>
        {/*view selection logic here*/}
        <button className="save-to-backend-badge" onClick={this.openModal}>
          save to...
        </button>
        <AccountListContainer value={modalOpen}
                              post={post}
                              store={store}
                              dispatch={dispatch}
                              onClose={this.closeModal}
                              component={SaveToBackendModal} {..._props}/>
      </FlexItem>
    )
  }

  componentWillMount() {
    this.setState({modalOpen: false});
  }

  @autobind
  openModal() {
    this.setState({modalOpen: true});
  }

  @autobind
  closeModal() {
    this.setState({modalOpen: false});
  }

  @autobind
  toggleModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

}

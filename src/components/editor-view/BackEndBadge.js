/** Created by ge on 5/12/16. */
import React, {Component, PropTypes} from 'react';
import FlexItem from "../layout/FlexItem";
import Button from "../form/Button";
import AccountListContainer from "../../store/accounts/AccountsListContainer";
import SaveToBackendModal from "./modals/SaveToBackendModal/SaveToBackendModal";

require('./save-to-backend-badge.scss');
var {any, func} = PropTypes;
export default class BackEndBadge extends Component {
  static propTypes = {
    post: any,
    account: any,
    dispatch: func.isRequired,
    style: any
  };

  render() {
    var {style, store, post, dispatch, ..._props} = this.props;
    return (
      <FlexItem fixed style={{"padding": "0 5px"}}>
        {/*view selection logic here*/}
        <button
          className="save-to-backend-badge"
          onClick={this.openModal.bind(this)}
        >save to...
        </button>
        <AccountListContainer store={store}
                              dispatch={dispatch}
                              value={this.state.modalOpen}
                              post={post}
                              onClose={this.closeModal.bind(this)} {..._props}
                              component={SaveToBackendModal}></AccountListContainer>
      </FlexItem>
    )
  }

  componentWillMount() {
    this.setState({modalOpen: false});
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  toggleModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

}

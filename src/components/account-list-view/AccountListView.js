import React, {Component} from "react";
import AccountListItem from "./AccountListItem";
import BrowserColumnView from "./BrowserColumnView";

export default class AccountListView extends Component {
  componentWillMount() {
    this.setState({showAccount: null});
  }

  removeAccount(account) {
    return ()=> {
      let action = {
        type: "DELETE_ACCOUNT",
        account: account
      };
      this.props.dispatch(action);
    };
  }

  onClick(account) {
    return ()=> {
      // dapi.list().then(({entries})=>{
      //   let action = {
      //     type: "UPDATE_ACCOUNT",
      //     account: account,
      //   };
      // });
      this.setState({showAccount: account})
    };
  }

  render() {
    let {accountList = [], post} = this.props;
    let {showAccount, rootPath} = this.state;
    return (
      <div className="account-list-view">
        {accountList.map((account)=> {
          let key = `${account.service}:${+account.uid}`;
          let item = <AccountListItem key={key}
                                  account={account}
                                  onDelete={this.removeAccount(account)}
                                  onClick={this.onClick(account)}/>;
          return (showAccount == account ?
            [
              item,
              <BrowserColumnView title={account.title}
                                 breadCrumb={account.rootPath}
                                 items={account.activeList}
                                 searchQuery={null}
                                 backButtonText="back"
                                 onSelect={(rootPath)=>{
                                   // get rid of all set state.
                                   this.setState({rootPath})
                                 }}
                                 onQueryUpdate={()=>{}}
                                 onClicke={()=>{}}
                                 onSubmit={()=>{}}
              />
            ] : item);
        })}
      </div>
    );

  };
}

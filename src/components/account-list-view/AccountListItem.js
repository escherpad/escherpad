/** Created by ge on 5/30/16. */
import React, {Component, PropTypes} from "react";
import MouseOver from "../mouseover/MouseOver";
import TwoColumn from "../two-column/TwoColumn";
import BadgeWithControl from "../badge/BadgeWithControl";

require('./account-list-view.scss');

const {object, func, bool} = PropTypes;
export default class ListItem extends Component {
  static propTypes = {
    account: object,
    onDelete: func,
    onClick: func,
    showBrowser: bool,
    post: object,
    dispatch: func
  };

  render() {
    var {account, onDelete, onClick} = this.props;
    return <TwoColumn className="account-list-item"
                      onClick={onClick}
                      col1={(
                        <span>Dropbox Configured As</span>
                      )}
                      col2={(
                        <BadgeWithControl className="account-badge"
                                          style={{backgroundColor: "#23aaff", color: "white"}}
                                          text={(account.email || "email is not available")}
                                          icon={(
                                            <MouseOver>
                                              <i data-mouseOver className="material-icons"
                                                 onClick={onDelete}>cancel</i>
                                              <i data-mouseDefault className="material-icons">clear</i>
                                            </MouseOver>
                                          )}
                        />
                      )}
    />;
  }
}

/** Created by ge on 4/18/16. */
import React from "react";
import {autobind} from "core-decorators";
import SmallBlueBadge from "../badge/SmallBlueBadge";
import {Flex, FlexItem, FlexSpacer} from "layout-components";
import Radium from "radium";
import Placeholder from "../placeholder/Placeholder";
import moment from "moment";
import {getServiceFromAccountKey} from "../../store/accounts/accounts";
import {setCurrentFolder} from "../../store/postList";
import {getParentFolder} from "../account-list-view/BrowserColumnView";

require('./post-item.scss');

var {string, any, number, func} = React.PropTypes;
@Radium
export default class PostListItem extends React.Component {
  static propTypes = {
    searchQuery: string,
    id: string,
    title: string,
    source: any,
    presence: any,
    createdAt: number,
    modifiedAt: number,
    dispatch: func.isRequired
  };

  render() {
    const {
      searchQuery,
      id,
      title,
      source,
      presence,
      path,
      accountKey,
      createdAt,
      modifiedAt
    } = this.props;

    let timeStamp;
    if (modifiedAt) timeStamp = moment(modifiedAt).fromNow();
    else if (createdAt) timeStamp = moment(createdAt).fromNow();
    else timeStamp = '';

    let searchQueryRegex = new RegExp(searchQuery, 'ig');
    let highlightedTitle = (searchQuery && title && title.match(searchQueryRegex)) ?
      title.replace(searchQueryRegex, "<mark>$&</mark>") : title;

    return (
      <div className="post-list-item"
           onTouchStart={this.selectPost}
           onMouseDown={this.selectPost}>
        <div className="control-group">
          <button onClick={this.deletePost}>
            <i className="material-icons delete-post">close</i>
          </button>
        </div>
        <Placeholder className="post-title"
                     style={{lineHeight: "22px", fontSize: "18px", fontWeight: "700"}}
                     isEmpty={(!title || title.replace(/(&nbsp;|<br>|<br\/>|<br><\/br>)/g, " ").trim() === "")}
                     placeholder={<em className="placeholder">Untitled</em>}>
          <div dangerouslySetInnerHTML={{__html: highlightedTitle}}/>
        </Placeholder>
        <Flex row style={{justifyContent: "right"}} className="modified-at">
          <FlexItem fluid style={{overflowX: "hidden"}}>
            {accountKey ?
              <SmallBlueBadge
                onClick={this.goToFolder}>{getServiceFromAccountKey(accountKey)}:{path}</SmallBlueBadge> :
              <SmallBlueBadge style={{backgroundColor: "#aaa"}}>LocalStorage</SmallBlueBadge>
            }
          </FlexItem>
          <FlexItem fixed width="5px"/>
          <FlexItem fixed>{timeStamp}</FlexItem>
        </Flex>
      </div>
    )
  }

  @autobind
  selectPost() {
    this.props.dispatch({
      type: "SELECT_POST",
      postId: this.props.id
    })
  }

  @autobind
  deletePost() {
    // backlog: show a popup to confirm delete
    this.props.dispatch({
      type: "DELETE_POST",
      id: this.props.id
    })
  }

  @autobind
  goToFolder(e) {
    const {accountKey, path} = this.props;
    e.stopPropagation();
    e.preventDefault();
    this.props.dispatch(setCurrentFolder(accountKey, path));
    // to prevent the parent from firing
  }

}


/** Created by ge on 12/30/16. */
import React, {Component, PropTypes} from "react";
import {setCurrentFolder} from "../../store/postList";
import SmallBlueBadge from "../badge/SmallBlueBadge";
const {string, func} = PropTypes;

export class BreadCrumBadges extends Component {
  static propTypes = {
    accountKey: string,
    path: string,
    dispatch: func.isRequired
  };

  goToPath(path) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.dispatch(setCurrentFolder(this.props.accountKey, path))
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.path !== this.props.path);
  }

  render() {
    "use strict";
    const {path} = this.props;
    // logic for cutting up:
    const paths = path.split('/').slice(1);
    const pathAndFolders = paths.map((folder, ind) => {
      return {
        path: '/' + paths.slice(0, ind + 1).join('/'),
        folder
      };
    });
    return <span>
      {pathAndFolders.map(({path, folder}) => [
        <span style={{color: "#23aaff", fontWeight: 900, margin: "0 2px", lineHeight: "24px"}}>›</span>,
        <SmallBlueBadge onClick={this.goToPath(path)}>{folder}</SmallBlueBadge>]
      )}
    </span>
  }
}

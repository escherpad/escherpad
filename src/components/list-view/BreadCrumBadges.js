/** Created by ge on 12/30/16. */
import React, {Component, PropTypes} from "react";
import {setCurrentFolder} from "../../store/postList";
import SmallBlueBadge from "../badge/SmallBlueBadge";
const {string, func} = PropTypes;

export class BreadCrumBadges extends Component {
  static propTypes = {
    accountKey: string,
    currentFolder: string,
    displayPath: string,
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
    return (
      nextProps.currentFolder !== this.props.currentFolder ||
      nextProps.displayPath !== this.props.displayPath
    );
  }

  render() {
    "use strict";
    const {currentFolder, displayPath} = this.props;
    console.log(currentFolder, displayPath);
    // is relative
    if (displayPath === "./") return <SmallBlueBadge onClick={this.goToPath(currentFolder)}>./</SmallBlueBadge>;
    if (displayPath.match(/^\.\//)) {
      let paths = displayPath.slice(2).split('/');
      return <span>
        <SmallBlueBadge onClick={this.goToPath(currentFolder)}>./</SmallBlueBadge>
        {paths.map((folder, ind) => [
          <span style={{color: "#23aaff", fontWeight: 900, margin: "10px 2px 0px", lineHeight: "24px"}}>›</span>,
          <SmallBlueBadge
            onClick={this.goToPath(currentFolder + '/' + paths.slice(0, ind + 1).join('/'))}>{folder}</SmallBlueBadge>
        ])}</span>
    } else if (displayPath.match(/^\//)) {
      let paths = displayPath.slice(1).split('/');
      return <span>{paths.map((folder, ind) => [
        ind ? // hide the first one
          <span style={{color: "#23aaff", fontWeight: 900, margin: "10px 2px 0px", lineHeight: "16px"}}>›</span>
          : null,
        <SmallBlueBadge onClick={this.goToPath('/' + paths.slice(0, ind + 1).join('/'))}>{folder}</SmallBlueBadge>
      ])}</span>
    } else {
      return <warning>path is malformed</warning>
    }
  }
}

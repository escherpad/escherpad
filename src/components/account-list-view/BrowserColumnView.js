/** Created by ge on 12/5/16. */
import React, {Component, PropTypes} from "react";
import {autobind} from "core-decorators";
import {Row} from "layout-components";
import Selector from "../../lib/Selector";
let {func, any, array} = PropTypes;
import Folder from "./Folder";
import File from "./File";
import {dropboxAccountKey} from "../../store/accounts/accounts";
import {listFiles} from "../../store/accountBrowser";

require('./browser-column-view.scss');

export function getParentFolder(currentFolder) {
  return currentFolder ? currentFolder.split('/').slice(0, -1).join('/') : undefined;
}

class BrowserColumns extends Component {
  static propTypes = {
    title: any,
    breadCrumb: any,
    items: array,
    backButtonText: any,
    searchQuery: any,
    onQueryUpdate: func,
    onClick: func
  };

  static defaultProps = {
    items: []
  };

  @autobind
  backupPath() {
    let parentFolder = getParentFolder(this.props.breadCrumb);
    this.props.dispatch(listFiles(parentFolder, dropboxAccountKey(this.props.account)));
  }

  selectPath(folder) {
    return () => {
      this.props.dispatch(listFiles(folder, dropboxAccountKey(this.props.account), folder))
    }
  }

  render() {
    let {backButtonText, searchQuery, items, breadCrumb, onQueryUpdate} = this.props;
    return <div className="browser-column">
      <Row component="div" className="title-bar">
        {/*{backButtonText ? backButtonText : null}*/}
        <button onClick={this.backupPath}>&lt; back</button>
        {breadCrumb ? <span className="bread-crumb">{breadCrumb}</span> : null}
        {/*<input className="search-box" onInput={onQueryUpdate}></input>*/}
      </Row>
      {searchQuery ?
        <div className="search-view">
          {items.map((item, key) => <div className="search-entry" key={key}>
            <div className="entry-title">{item.title}</div>
            <div className="entry-path">{item.path}</div>
          </div>)}
        </div> :
        <div className="item-list-view">
          {items.map((item, key) => {
            if (item[".tag"] == "folder") {
              return <Folder key={key}
                             title={item.name}
                             onClick={this.selectPath(item.path_display)}
              />;
            } else {
              return <File key={key}
                           title={item.name}
              />;
            }
          })}
        </div>
      }
    </div>
  }
}

export default Selector((store) => {
  "use strict";
  return {};
}, BrowserColumns)

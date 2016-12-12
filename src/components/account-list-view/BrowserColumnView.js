/** Created by ge on 12/5/16. */
import React, {Component, PropTypes} from "react";
import autobind from "autobind-decorator";
import {Row} from "layout-components";
import Selector from "../../lib/Selector";
let {func, any, array} = PropTypes;
import Folder from "./Folder";
import File from "./File";

require('./browser-column-view.scss');

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
    let parentPath = this.props.breadCrumb.split('/').slice(0, -1).join('/');
    this.props.dispatch({
      type: "ACCOUNT_BROWSER_LIST_FILES",
      account: this.props.account,
      path: parentPath
    });
  }

  selectPath(path) {
    return ()=> {
      this.props.dispatch({
        type: "ACCOUNT_BROWSER_LIST_FILES",
        account: this.props.account,
        path: path
      })
    }
  }

  render() {
    let {backButtonText, searchQuery, items, breadCrumb: breadCrumb, onQueryUpdate} = this.props;
    return <div className="browser-column">
      <Row component="div" className="title-bar">
        {/*{backButtonText ? backButtonText : null}*/}
        <button onClick={this.backupPath}>&lt; back</button>
        {breadCrumb ? <span className="bread-crumb">{breadCrumb}</span> : null}
        {/*<input className="search-box" onInput={onQueryUpdate}></input>*/}
      </Row>
      {searchQuery ?
        <div className="search-view">
          {items.map((item, key)=><div className="search-entry" key={key}>
            <div className="entry-title">{item.title}</div>
            <div className="entry-path">{item.path}</div>
          </div>)}
        </div> :
        <div className="item-list-view">
          {items.map((item, key)=> {
            if (item[".tag"] == "folder") {
              return <Folder key={key}
                             title={item.name}
                             onClick={this.selectPath(item.path_display)}
              />;
            } else {
              return <File key={key}
                           title={item.name}
                           onClick={this.selectPath(item.path_display)}
              />;
            }
          })}
        </div>
      }
    </div>
  }
}

export default Selector((store)=> {
  "use strict";
  return {};
}, BrowserColumns)

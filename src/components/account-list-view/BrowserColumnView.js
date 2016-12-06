/** Created by ge on 12/5/16. */
import React, {Component, PropTypes} from "react";
let {func, any, array} = PropTypes;

export default class BrowserColumns extends Component {
  static propTypes = {
    title: any,
    breadCrumb: any,
    items: array,
    backButtonText: any,
    searchQuery: any,
    onQueryUpdate: func,
    onClick: func,
    onSubmit: func
  };

  static defaultProps = {
    items: []
  };

  render() {

    let {backButtonText, searchQuery, items, breadCrumb: breadCrumb, onQueryUpdate} = this.props;
    return <div className="browser-column">
      <div className="title-bar">
        {backButtonText ? backButtonText : null}
        {breadCrumb ? breadCrumb.map((crumb)=><span className="bread-crumb"> {crumb}</span>) : null}
        <input className="search-box" onInput={onQueryUpdate}></input>
      </div>
      {searchQuery ?
        <div className="search-view">
          {items.map((item)=><div className="search-entry">
            <div className="entry-title">{item.title}</div>
            <div className="entry-path">{item.path}</div>
          </div>)}
        </div> :
        <div className="item-list-view">
          {items.map((item)=><div className="list-item">
            <div className="item-icon">{(item.is_folder ? <icon></icon> : null)}</div>
            <div className="item-title">{item.title}</div>
            <div className="item-meta">{item.modified}</div>
          </div>)}
        </div>
      }
    </div>
  }
}


/** Created by ge on 3/10/16. */
import React, {Component, PropTypes} from 'react';
import Selector from "../../lib/Selector";
import {Flex, FlexItem} from 'layout-components';
import InlineEditable from "../editable/InlineEditable";
import Popover from "../popover/Popover";
import EditorConfigModal from "./modals/EditorConfigModal";
import autobind from "autobind-decorator";

import Radium from 'radium';

const styles = {
  container: {
    borderBottom: "1px solid #eeeeee",
    alignItems: "bottom",
    position: "relative", // to allow expansion with child
    marginRight: "100px"
  },
  editor: {
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    justifyItems: "stretch"
  },
  title: {
    color: "#2b2b2b",
    fontSize: "25px",
    fontWeight: 500,
    lineHeight: "45px",
    height: "45px",
    boxSizing: "border-box",
    overflowX: "none",
    margin: 0
  },
  button: {
    color: "#cfcfcf",
    backgroundColor: "rgba(255, 255, 255, 0)",
    border: "none",
    boxShadow: "none",
    fontSize: "24px",
    lineHeight: "45px",
    cursor: "pointer",
    ":hover": {
      color: "#23aaff",
      textShadow: "0 0 2px #23aaff"
    }
  },
  clickable: {
    cursor: "pointer"
  },
  status: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: "10px",
    fontSize: "14px",
    hint: {
      color: "#888888",
      marginRight: "4px",
      fontWeight: "500"
    },
    info: {
      color: "#23aaff",
      ":hover": {
        textShadow: "0 0 2px #23aaff"
      }
    },
    button: {
      fontSize: "12px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "none",
      boxShadow: "none",
      cursor: "pointer"
    }
  }
};

var {any, func} = PropTypes;

@Radium
class TitleBar extends Component {
  static propTypes = {
    post: any,
    options: any,
    dispatch: func.isRequired,
    editorConfigModal: any,
    style: any
  };

  onTitleChange(title) {
    // let title = _title.replace('\<br\>', "");
    let {post = {}, dispatch} = this.props;
    let {id} = post;
    if (!id) return;
    var modifiedAt = Date.now();
    dispatch({
      type: "UPDATE_POST",
      post: {
        id, title, modifiedAt
      }
    });
  }

  @autobind
  toggleModal() {
    this.props.dispatch({
      type: "POST_SAVE_MODAL_TOGGLE"
    });
  }

  render() {
    let {style, dispatch, post, editorConfigModal, options} = this.props;
    let {id, title} = post;
    return (
      <Flex row align="stretch" style={{...styles.container, ...style}}>
        <FlexItem fixed style={{minWidth: "110px", maxWidth: "calc(100% - 200px)"}}>
          <InlineEditable
            key={id}
            value={title || ""}
            component="h1"
            style={styles.title}
            placeholder="Untitled..."
            onChange={this.onTitleChange.bind(this)}
          />
        </FlexItem>
        <FlexItem fixed className="editor-options-and-modal-container">
          <Popover component={
            <i className="material-icons editor-title-dropdown"
               key="title-icon"
               style={{...styles.button, ...styles.clickable}}>keyboard_arrow_down</i>
          }
                   collapseOnMouseLeave="true">
            <div className="popover-menu-item" onClick={this.toggleModal}>
              <i className="material-icons">menu</i>Editor Settings
            </div>
          </Popover>
          <EditorConfigModal value={editorConfigModal.open}
                             onClose={this.toggleModal}
                             post={post}
                             options={options}
                             dispatch={dispatch}
          />
        </FlexItem>
        <FlexItem fluid/>
        <FlexItem fixed className="status" style={styles.status}>
          <div className="hint" style={styles.status.hint}>Type:</div>
          <div className="info editor-status-dropdown" style={[styles.status.info, styles.clickable]}>{"md"}
            <i className="material-icons" style={styles.status.button}>keyboard_arrow_down</i>
          </div>
        </FlexItem>
      </Flex>
    )
  }
}

export default Selector((store)=> {
  "use strict";
  let {editorConfigModal} = store;
  return {editorConfigModal};
}, TitleBar)

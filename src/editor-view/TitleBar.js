/** Created by ge on 3/10/16. */
import React, {Component, PropTypes} from 'react';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import InlineEditable from "../editable/InlineEditable";
import Popover from "../popover/Popover";
import EditorConfigModal from "./modals/EditorConfigModal";

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
    overflowX: "hidden"
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
export default class TitleBar extends Component {
  static propTypes = {
    post: any,
    options: any,
    dispatch: func.isRequired,
    style: any
  };

  componentWillMount() {
    this.setState({configModalOpen: false});
  }

  onTitleChange(title) {
    var {post={}, dispatch} = this.props;
    var {id} = post;
    if (!id) return;
    var modifiedAt = Date.now();
    dispatch({
      type: "UPDATE_POST",
      post: {
        id, title, modifiedAt
      }
    });
  }

  toggleModal() {
    this.setState({configModalOpen: !this.state.configModalOpen});
    // var editorConfigModal = this.refs['editor-config-modal'];
    // editorConfigModal.open();
  }

  render() {
    var {style, dispatch, post, options} = this.props;
    var {id, title} = post;
    return (
      <Flex row align="stretch" style={{...styles.container, ...style}}>
        <FlexItem fixed style={{ minWidth: "110px", maxWidth: "calc(100% - 200px)" }}>
          <InlineEditable
            key={id}
            value={title || ""}
            className="h1"
            style={styles.title}
            placeholder="Untitled..."
            onChange={this.onTitleChange.bind(this)}
          ></InlineEditable>
        </FlexItem>
        <FlexItem fixed className="editor-options-and-modal-container">
          <Popover component={
                <i className="material-icons editor-title-dropdown"
                   key="title-icon"
                   style={{...styles.button, ...styles.clickable}}>keyboard_arrow_down</i>
               }
                   collapseOnMouseLeave="true">
            <div className="popover-menu-item" onClick={this.toggleModal.bind(this)}>
              <i className="material-icons">menu</i>Editor Settings
            </div>
          </Popover>
          <EditorConfigModal value={this.state.configModalOpen}
                             onClose={this.toggleModal.bind(this)}
                             post={post}
                             options={options}
                             dispatch={dispatch}
          ></EditorConfigModal>
        </FlexItem>
        <FlexItem fluid></FlexItem>
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

/** Created by ge on 3/10/16. */
import React from 'react';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";

import Radium from 'radium';
import InlineEditable from "../editable/InlineEditable";

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

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    style: React.PropTypes.any
  };

  onTitleChange(title) {
    var {id, dispatch} = this.props;
    var modifiedAt = Date.now();
    dispatch({
      type: "UPDATE_POST",
      post: {
        id, title, modifiedAt
      }
    })
  }

  render() {
    var {style, dispatch, ...post} = this.props;
    var {id, title, createdAt, modifiedAt, presence} = post;
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
        <FlexItem fixed>
          <i className="material-icons" key="title-icon"
             style={[styles.button, styles.clickable]}>keyboard_arrow_down</i>
        </FlexItem>
        <FlexItem fluid></FlexItem>
        <FlexItem fixed className="status" style={styles.status}>
          <div className="hint" style={styles.status.hint}>Type:</div>
          <div className="info" style={[styles.status.info, styles.clickable]}>{"md"}
            <i className="material-icons" style={[styles.status.button]}>arrow_drop_down</i>
          </div>
        </FlexItem>
      </Flex>
    )
  }
}
// <span className="dropdown chevron-bottom" style={[styles.status.button]}> </span>

/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import InlineEditable from "../editable/InlineEditable";
require('./chevron.scss');
const styles = {
  container: {
    borderBottom: "1px solid #eeeeee",
    display: "flex",
    flexDirection: "row",
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
    minWidth: "24px",
    maxWidth: "calc(100% - 200px)",
    marginRight: "5px",
    boxSizing: "border-box",
    overflowX: "hidden"
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    border: "none",
    boxShadow: "none",
    fontSize: "24px",
    cursor: "pointer"
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
      flex: "0 0 auto",
      color: "#888888",
      marginRight: "4px",
      fontWeight: "500"
    },
    info: {
      flex: "0 0 auto",
      color: "#23aaff",
      ":hover": {
        textShadow: "0 0 2px #23aaff"
      },
    },
    button: {
      marginLeft: "10px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "none",
      boxShadow: "none",
      cursor: "pointer"
    }
  },
  blocks: {
    display: "block"
  },
  flexFixed: {
    flex: "0 0 auto",
  },
  flexFluid: {
    flex: "1 1 auto",
  },
  dropdownButton: {}
};

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    post: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    style: React.PropTypes.any
  };

  onTitleChange(title) {
    let dispatch = this.props.dispatch;
    let post = this.props.post;
    dispatch({
      type: "UPDATE_POST",
      post: {
        id: post.id,
        title: title
      }
    })
  }

  render() {
    let style = this.props.style;
    let post = this.props.post;
    let onTitleChange = this.onTitleChange.bind(this);
    return (
      <div className="title-bar" style={[styles.container, style]}>
        <InlineEditable
          value={post.title || ""}
          className="h1"
          style={[styles.blocks, styles.flexFixed, styles.title]}
          placeholder="Untitled..."
          onChange={onTitleChange}
        ></InlineEditable>
        <button className="dropdown chevron-bottom" style={[styles.blocks, styles.flexFixed, styles.button]}></button>
        <div className="spacer" style={[styles.blocks, styles.flexFluid]}></div>
        <div className="status" style={[styles.blocks, styles.flexFixed, styles.status]}>
          <div className="hint" style={styles.status.hint}>Type:</div>
          <div className="info" style={[styles.status.info, styles.clickable]}>{"md"}
            <span className="dropdown chevron-bottom" style={[styles.status.button]}> </span>
          </div>
        </div>
      </div>
    )
  }
}

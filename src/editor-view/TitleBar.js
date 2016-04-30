/** Created by ge on 3/10/16. */
import React from 'react';
import Radium from 'radium';
import InlineEditable from "../editable/InlineEditable";
require('./chevron.scss');
import {flexRow, flexFluid, flexFixed} from '../layout/style-globals';
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
      color: "#888888",
      marginRight: "4px",
      fontWeight: "500"
    },
    info: {
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
  dropdownButton: {}
};

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    style: React.PropTypes.any
  };

  onTitleChange(title) {
    var {id, dispatch} = this.props;
    console.log(id, title);
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
      <div className="title-bar" style={[styles.container, flexRow, style]}>
        <InlineEditable
          key={id}
          value={title || ""}
          className="h1"
          style={[styles.blocks, flexFixed, styles.title]}
          placeholder="Untitled..."
          onChange={this.onTitleChange.bind(this)}
        ></InlineEditable>
        <button className="dropdown chevron-bottom" style={[styles.blocks, flexFixed, styles.button]}></button>
        <div className="spacer" style={[styles.blocks, flexFluid]}></div>
        <div className="status" style={[styles.blocks, flexFixed, styles.status]}>
          <div className="hint" style={[styles.status.hint, flexFixed]}>Type:</div>
          <div className="info" style={[styles.status.info, styles.clickable, flexFixed]}>{"md"}
            <span className="dropdown chevron-bottom" style={[styles.status.button]}> </span>
          </div>
        </div>
      </div>
    )
  }
}

/** Created by ge on 3/23/16. */
import React from 'react';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Responsive from "../layout/Responsive";
import FullScreenToggleButton from "./FullScreenToggleButton";
import Tag from "./Tag";
import Button from "../form/Button";
import BackEndBadge from "./BackEndBadge";

import {createPost} from "../../store/posts/posts";

const containerStyle = {
  position: "relative",
  left: 0,
  right: 0,
  height: "50px"
};
const child = {
  fontSize: "12px",
  height: "20px",
  padding: "7px",
  marginRight: "10px"
};
var {bool, any, func} = React.PropTypes;
export default class PostHeader extends React.Component {
  static propTypes = {
    style: any,
    viewMode: any,
    dispatch: func.isRequired
  };

  createNewNote(e) {
    var {dispatch} = this.props;
    var action = createPost();
    dispatch(action);
    var postId = action.post.id;
    dispatch({type: "SELECT_POST", post: postId});
  }

  render() {
    var {viewMode, dispatch, ...props} = this.props;
    return (
      <Flex row fill style={containerStyle} align="center">
        <Responsive breakPoints={{sm: 1000}}>
          <FullScreenToggleButton data-default viewMode={viewMode} dispatch={dispatch}></FullScreenToggleButton>
          <FlexItem fixed data-sm style={{"padding": "0 8px", height: "25px", width: "40px", textAlign:"center"}}>
            <i className="material-icons" style={{color: "#cfcfcf", fontSize: "25px", cursor: "pointer"}}>menu</i>
          </FlexItem>
        </Responsive>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button
            className="add-new-post"
            color="rgb(240, 173, 50)"
            backgroundColor="rgba(240, 173, 50, 0)"
            hoverColor="white"
            hoverBackground="rgb(240, 173, 50)"
            activeBackground="rgba(240, 173, 50, 0.5)"
            onClick={this.createNewNote.bind(this)}
            padding="0 28px 0 12px"
          >New Note<
            i className="material-icons"
              style={{fontSize: "18px", lineHeight: "32px", position: "absolute", marginRight: "-23px", width: "24px"}}>add</i
          ></Button>
        </FlexItem>
        <BackEndBadge dispatch={dispatch} {...props}></BackEndBadge>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button
            className="add-new-post"
            height="25px"
            radius="13px"
            color="#d5d5d5"
            backgroundColor="rgba(0, 0, 0, 0)"
            hoverColor="white"
            hoverBackground="#23aaff"
            activeBackground="#23aaff"
            padding="0 8px 0 8px"
          >tag with bindr...
          </Button>
        </FlexItem>
        <FlexItem fluid></FlexItem>
      </Flex>
    )
  }
}


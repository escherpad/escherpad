/** Created by ge on 3/23/16. */
import React from 'react';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";
import Responsive from "../layout/Responsive";
import FullScreenToggleButton from "./FullScreenToggleButton";
import Tag from "./Tag";
import Input from "./Input";
import Button from "../button/Button";

import {createPost} from "../posts/posts";

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
    this.props.dispatch(createPost());
  }

  render() {
    var {viewMode, dispatch} = this.props;
    return (
      <Flex row fill style={containerStyle} align="center">
        <Responsive breakPoints={{sm: 1000}}>
          <FullScreenToggleButton default viewMode={viewMode} dispatch={dispatch}></FullScreenToggleButton>
          <FlexItem fixed sm style={{"padding": "0 8px", height: "25px", width: "40px", textAlign:"center"}}>
            <i className="material-icons" style={{color: "#cfcfcf", fontSize: "25px", cursor: "pointer"}}>menu</i>
          </FlexItem>
        </Responsive>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button
            color="rgb(240, 173, 50)"
            backgroundColor="rgba(240, 173, 50, 0)"
            hoverColor="white"
            hoverBackground="rgb(240, 173, 50)"
            activeBackground="rgba(240, 173, 50, 0.5)"
            onClick={this.createNewNote.bind(this)}
            padding="0 28px 0 12px">New Post<
            i className="material-icons"
              style={{fontSize: "18px", lineHeight: "32px", position: "absolute", marginRight: "-23px", width: "24px"}}>add</i
          ></Button>
          <FlexItem fluid> </FlexItem>
        </FlexItem>
        <FlexItem fluid></FlexItem>
      </Flex>
    )
  }
}


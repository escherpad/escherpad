/** Created by ge on 3/23/16. */
import React from 'react';
import Flex from "../layout/Flex";
import FlexItem from "../layout/FlexItem";

import FullScreenToggleButton from "./FullScreenToggleButton";


import Tag from "./Tag";
import Input from "./Input";
import Button from "../button/Button";
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
var {any, func} = React.PropTypes;
export default class PostHeader extends React.Component {
  static propTypes = {
    style: any
  };

  constructor() {
    super();
  }

  createNewNote(e) {
    console.log('create new note', e);
  }

  render() {
    return (
      <Flex row fill style={containerStyle} align="center">
        <FullScreenToggleButton onClick={this.createNewNote.bind(this)}></FullScreenToggleButton>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button
            color="rgb(240, 173, 50)"
            backgroundColor="rgba(240, 173, 50, 0)"
            hoverColor="white"
            hoverBackground="rgb(240, 173, 50)"
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


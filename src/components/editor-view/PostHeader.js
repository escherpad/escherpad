/** Created by ge on 3/23/16. */
import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Flex, FlexItem, Responsive} from 'layout-components';
import FullScreenToggleButton from "./FullScreenToggleButton";
import SaveToBackEndBadge from "./SaveToBackEndBadge";
import {CreateNewNote} from "./CreateNewNote";
import Button from "../form/Button";
import {BreadCrumBadges} from "../list-view/BreadCrumBadges.js";

const containerStyle = {
  position: "relative",
  left: 0,
  right: 0,
  height: "50px"
};
const {any, func} = PropTypes;
export default class PostHeader extends Component {
  static propTypes = {
    style: any,
    viewMode: any,
    dispatch: func.isRequired
  };

  render() {
    let {viewMode, dispatch, ..._props} = this.props;
    let post = _props.post;
    return (
      <Flex row fill style={containerStyle} align="center">
        <FullScreenToggleButton data-default viewMode={viewMode} dispatch={dispatch}/>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <CreateNewNote dispatch={dispatch} {..._props}/>
        </FlexItem>
        <FlexItem fixed component="span" style={{maxWidth: "900px", display: "inline-block", overflowX: "auto"}}>
          {post ? <SaveToBackEndBadge dispatch={dispatch} {..._props}/> : null}
          {(post && post.parentFolder) ?
            <BreadCrumBadges accountKey={post.accountKey}
                             urrentFolder={""}
                             displayPath={post.parentFolder}
                             dispatch={dispatch}/>
            : null}
        </FlexItem>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button className="add-new-post"
                  height="25px"
                  radius="13px"
                  color="#d5d5d5"
                  backgroundColor="rgba(0, 0, 0, 0)"
                  hoverColor="white"
                  hoverBackground="#23aaff"
                  activeBackground="#23aaff"
                  padding="0 8px 0 8px">tag with bindr...</Button>
        </FlexItem>
        <FlexItem fluid/>
      </Flex>
    )
  }
}


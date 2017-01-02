/** Created by ge on 1/1/17. */
import React, {Component, PropTypes} from "react";
import {createPost} from "../../store/posts/posts";
import {autobind} from "core-decorators";
import Button from "../form/Button";

export class CreateNewNote extends Component {
  static propTypes = {
    post: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  @autobind
  createNewNote() {
    //note: might want to use postList as a backup when no post is selected.
    const {post = {}, dispatch} = this.props;
    const action = createPost(
      post.mimeType || "text/markdown",
      post.accountKey,// || postList.accountKey,
      post.parentFolder,// || postList.currentFolder
    );
    dispatch(action);
    const postId = action.post.id;
    dispatch({type: "SELECT_POST", postId: postId});
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log(this.props);
    return <Button
      className="add-new-post"
      color="rgb(240, 173, 50)"
      backgroundColor="rgba(240, 173, 50, 0)"
      hoverColor="white"
      hoverBackground="rgb(240, 173, 50)"
      activeBackground="rgba(240, 173, 50, 0.5)"
      onClick={this.createNewNote}
      padding="0 28px 0 12px"
    >New Note<
      i className="material-icons"
        style={{fontSize: "18px", lineHeight: "32px", position: "absolute", marginRight: "-23px", width: "24px"}}>add</i
    ></Button>
  }
}

// export Selector(state=>{
//   "use strict";
//   return {
//
//   }
// }, CreateNewNote) as CreateNewNote;

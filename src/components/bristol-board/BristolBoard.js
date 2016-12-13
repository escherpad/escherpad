/** Created by ge on 12/12/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import {Flex, FlexItem} from "layout-components";
import Bristol from "./react-bristol/src/Bristol";
import TitleBar from "../editor-view/TitleBar";
import PostHeader from "../editor-view/PostHeader";

import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

let {any, string} = PropTypes;
class BristolBoard extends Component {
  static propTypes = {
    agent: any.isRequired,
    user: any.isRequired,
    post: any.isRequired,
    dispatch: any.isRequired
  };

  constructor() {
    super();
  }

  render() {
    //todo: this will be removed after we add a post type selector as a parent.
    let {post} = this.props;
    if (!post) return (<div>post is not specified</div>);
    //todoEnd
    let {view, ...props} = this.props;
    return <Flex column fill align="stretch">
      <FlexItem fixed>
        <PostHeader {...props}/>
      </FlexItem>
      <FlexItem fluid>
        <Flex column fill>
          <FlexItem fixed>
            <TitleBar post={post}
                      options={post.options} {...props}/>
          </FlexItem>
          <FlexItem fluid>
            <Bristol width={600} height={1000}/>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  }
}

export default Selector((store) => {
  "use strict";
  let {agent, user} = store.session;
  let post = store.posts[store.editor.post];
  let options = store.editor.options;
  return {post, agent, user, options};
}, BristolBoard)

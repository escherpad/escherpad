/** Created by ge on 12/12/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import {autobind} from "core-decorators";
import {Flex, FlexItem} from "layout-components";
import Bristol from "./react-bristol/src/Bristol";
import SimplePen from './react-bristol/src/extensions/SimplePen';
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

  @autobind
  onChange(inkData) {
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: inkData
      }
    })
  }

  render() {
    //todo: this will be removed after we add a post type selector as a parent.
    let {post} = this.props;
    if (!post) return (
      <Flex column fill align="stretch">
        <FlexItem fixed>
          <PostHeader {...props}/>
        </FlexItem>
        <FlexItem fluid/>
      </Flex>
    );
    //todoEnd


    let {view, ...props} = this.props;
    const width = 800, height = 1000;
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
            <Bristol ref="bristol"
                     style={{borderRight: "1px solid rgba(125, 125, 125, 0.5)"}}
                     width={width} height={height}
                     renderRatio={2}
                     data={post.source}
                     pen={{type: "SimplePen", color: '#003BFF', strokeWidth: 2}}
                     palette={{SimplePen: SimplePen}}
                     onChange={this.onChange}
            />
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

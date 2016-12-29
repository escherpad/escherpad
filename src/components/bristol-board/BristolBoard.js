/** Created by ge on 12/12/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import {autobind, debounce} from "core-decorators";
import {Flex, FlexItem} from "layout-components";
import Bristol from "./react-bristol/src/Bristol";
import SimplePen from './react-bristol/src/extensions/SimplePen';
import Eraser from './react-bristol/src/extensions/Eraser';
import TitleBar from "../editor-view/TitleBar";
import PostHeader from "../editor-view/PostHeader";

// import debounce from "lodash.debounce";
// import throttle from "lodash.throttle";

let {any, string} = PropTypes;
class BristolBoard extends Component {
  static propTypes = {
    agent: any.isRequired,
    user: any.isRequired,
    post: any.isRequired,
    dispatch: any.isRequired
  };

  componentWillMount(){
    this.setState({pen: {type: "SimplePen", color: '#003BFF', strokeWidth: 2}});
  }

  @autobind
  // @debounce(5000)
  onChange(inkData) {
    // slow store update is the bottle neck!
    //todo: use MERGE_POST type instead?
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: inkData
      }
    })
  }

  select(tool) {
    return ()=>{
      this.setState({pen: tool})
    }
  }

  render() {
    //DONE: this will be removed after we add a post type selector as a parent.
    //TODO: add content insert for what to do when source does not exist.
    let {post, ...props} = this.props;
    const width = 800, height = 1000;
    return <Flex column fill align="stretch">
      <FlexItem fixed>
        <PostHeader {...props}/>
      </FlexItem>
      <FlexItem fluid style={{"marginLeft": "30px"}}>
        <Flex column fill>
          <FlexItem fixed>
            <TitleBar post={post}
                      options={post.options} {...props}/>
          </FlexItem>
          <FlexItem fixed className="bristol-toolbar">
            <button className="select-pen"
                    onClick={this.select({type: "SimplePen", color: '#003BFF', strokeWidth: 2})}>
              <i className="material-icons">edit</i>
            </button>
            <button className="select-eraser" onClick={this.select({type: "Eraser", alpha: 0.5, strokeWidth: 20})}>
              <i className="material-icons">radio_button_unchecked</i>
            </button>
          </FlexItem>
          <FlexItem fluid>
            <Bristol ref="bristol"
                     style={{borderRight: "1px solid rgba(125, 125, 125, 0.5)"}}
                     width={width} height={height}
                     renderRatio={3}
                     data={post.source}
                     pen={this.state.pen}
                     palette={{SimplePen, Eraser}}
                     onChange={this.onChange}
            />
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  }
}

// pen={}
export default Selector((store) => {
  "use strict";
  let {agent, user} = store.session;
  let post = store.posts[store.editor.postId];
  let options = store.editor.options;
  return {post, agent, user, options};
}, BristolBoard)

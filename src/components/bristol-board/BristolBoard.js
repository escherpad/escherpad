/** Created by ge on 12/12/16. */
import React, {Component, PropTypes} from "react";
import Selector from "../../lib/Selector";
import {autobind, debounce} from "core-decorators";
import {Flex, FlexItem} from "layout-components";
import Bristol from "./react-bristol/src/Bristol";
import SimplePen, {STROKE_WIDTHS as PEN_WIDTHS} from './react-bristol/src/extensions/SimplePen';
import Eraser, {STROKE_WIDTHS as ERASER_WIDTHS} from './react-bristol/src/extensions/Eraser';
import StrokeWidthSelector from "./react-bristol/src/controls/StrokeWidthSelector";
import TitleBar from "../editor-view/TitleBar";
import PostHeader from "../editor-view/PostHeader";
import SizeContainer from "../SizeContainer";
import Range from "../form/Range";

let {any, string} = PropTypes;
class BristolBoard extends Component {
  static propTypes = {
    editor: any,
    agent: any.isRequired,
    user: any.isRequired,
    post: any.isRequired,
    dispatch: any.isRequired
  };

  componentWillMount() {
    this.setState({pen: {type: "SimplePen", color: '#255082', strokeWidth: 1}});
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
    return () => {
      this.setState({pen: tool})
    }
  }

  @autobind
  clearPage() {
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: []
      }
    })
  }

  @autobind
  undoStroke() {
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: this.props.post.source.slice(0, -1)
      }
    })
  }

  @autobind
  onChangeStrokeWidth(width) {
    // this.select({strokeWidth: width})();
    this.setState({
      pen: {
        ...(this.state || {}).pen,
        strokeWidth: width
      }
    })
  }


  render() {
    //DONE: this will be removed after we add a post type selector as a parent.
    //TODO: add content insert for what to do when source does not exist.
    let {post, ...props} = this.props;
    console.log(this.state.pen);
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
            <button className="undo-stroke" onClick={this.undoStroke}>
              <i className="material-icons">settings_backup_restore</i>
            </button>
            <button className="select-pen"
                    onClick={this.select({type: "SimplePen", color: '#255082', strokeWidth: 1})}>
              <i className="material-icons">edit</i>
            </button>
            <button className="select-eraser" onClick={this.select({type: "Eraser", alpha: 0.5, strokeWidth: 20})}>
              <i className="material-icons">radio_button_unchecked</i>
            </button>
            <button className="clear-page" onClick={this.clearPage}>
              <i className="material-icons">clear</i>
            </button>
            <StrokeWidthSelector value={this.state.pen.strokeWidth} strokeWidthList={PEN_WIDTHS}
                                 onChange={this.onChangeStrokeWidth}/>
            <svg width="20" height="20">
              <circle cx={10 + this.state.pen.strokeWidth * 3 / 2} cy="10" r={this.state.pen.strokeWidth * 3 / 2}
                      style={this.state.pen.color ?
                        {fill: this.state.pen.color} :
                        {fill: "#ececec", stroke: "#555", strokeWidth: "2", strokeDasharray:"3,2"}}/>
            </svg>
            <svg width="30" height="20">
              <text x="2" y="15" fontSize="15">{this.state.pen.strokeWidth}</text>
            </svg>
            <button className="clear-page" onClick={this.clearPage}>
              <i className="material-icons">clear</i>
            </button>
          </FlexItem>
          <SizeContainer container={FlexItem} fluid>
            <Bristol ref="bristol"
                     style={{borderRight: "1px solid rgba(125, 125, 125, 0.5)"}}
                     renderRatio={3}
                     data={post.source}
                     pen={this.state.pen}
                     palette={{SimplePen, Eraser}}
                     onChange={this.onChange}
            />
          </SizeContainer>
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

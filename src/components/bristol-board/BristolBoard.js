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
  static defaultProps = {
    post: {source: []}
  };

  componentWillMount() {
    this.setState({pen: {type: "SimplePen", color: '#255082', strokeWidth: 2}});
  }

  @autobind
  // @debounce(5000)
  onChange(inkData) {
    // slow store update is the bottle neck!
    //todo: use MERGE_POST type instead?

    const {post, agent} = this.props;
    let currentPageNumber = this.getCurrentPage();
    if (!post.source || !post.source.slice) {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          source: [inkData]
        }
      })
    } else {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          source: [
            ...post.source.slice(0, currentPageNumber),
            inkData,
            ...post.source.slice(currentPageNumber + 1)
          ]
        }
      });
    }
  }

  select(tool) {
    return () => {
      this.setState({pen: tool})
    }
  }

  @autobind
  clearPage() {
    const {post, agent} = this.props;
    let currentPageNumber = this.getCurrentPage();
    if (!post.source || !post.source.slice) {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          source: [[]]
        }
      })
    } else {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          source: [
            ...post.source.slice(0, currentPageNumber),
            [],
            ...post.source.slice(currentPageNumber + 1)
          ]
        }
      });
    }
  }

  @autobind
  undoStroke() {
    const {post, agent} = this.props;
    let currentPageNumber = this.getCurrentPage();
    const currentPage = post.source[currentPageNumber] || [];
    if (!post.source || !post.source.slice) {
      console.warn("source does not have slice method or doesn't exist");
    } else {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          source: [
            ...post.source.slice(0, currentPageNumber),
            currentPage.slice(0, -1),
            ...post.source.slice(currentPageNumber + 1)
          ]
        }
      });
    }
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

  @autobind
  previousPage() {
    const {agent, post} = this.props;
    let currentPageNumber = this.getCurrentPage();
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: post.id,
        presence: {[agent]: {page: currentPageNumber ? currentPageNumber - 1 : 0}}
      }
    })
  }

  @autobind
  getCurrentPage() {
    try {
      return this.props.post.presence[this.props.agent].page
    } catch (e) {
      return 0
    }
  }

  @autobind
  nextPage() {
    const {agent, post} = this.props;
    let currentPageNumber = this.getCurrentPage();
    if (currentPageNumber < post.source.length - 1) {
      this.props.dispatch({
        type: "UPDATE_POST",
        post: {
          id: this.props.post.id,
          presence: {[agent]: {page: currentPageNumber + 1}}
        }
      })
    } else {
      this.insertPage();
    }
  }

  @autobind
  insertPage() {
    const {agent, post} = this.props;
    const {source} = post;
    let currentPageNumber = this.getCurrentPage();
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: [...source.slice(0, currentPageNumber + 1), [], ...source.slice(currentPageNumber + 1)],
        presence: {[agent]: {page: currentPageNumber + 1}}
      }
    })
  }

  @autobind
  duplicatePage() {
    const {agent, post} = this.props;
    const {source} = post;
    let currentPageNumber = this.getCurrentPage();
    let currentPage = source[currentPageNumber];
    this.props.dispatch({
      type: "UPDATE_POST",
      post: {
        id: this.props.post.id,
        source: [...source.slice(0, currentPageNumber + 1), currentPage, ...source.slice(currentPageNumber + 1)],
        presence: {[agent]: {page: currentPageNumber + 1}}
      }
    })
  }

  render() {
    //DONE: this will be removed after we add a post type selector as a parent.
    //TODO: add content insert for what to do when source does not exist.
    let {post, agent, ...props} = this.props;
    let pageNumber = this.getCurrentPage();
    if (typeof post.source == "string") return <div>post content is string</div>;
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
                        {fill: "#ececec", stroke: "#555", strokeWidth: "2", strokeDasharray: "3,2"}}/>
            </svg>
            <svg width="30" height="20">
              <text x="2" y="15" fontSize="15">{this.state.pen.strokeWidth}</text>
            </svg>
            <button className="insert-page" onClick={this.insertPage}>
              <i className="material-icons">add</i>
            </button>
            <button className="previous-page" onClick={this.previousPage}>
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
            <span>{pageNumber + 1}</span>
            <button className="next-page" onClick={this.nextPage}>
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
            <button className="duplicate-page" onClick={this.duplicatePage}>
              <i className="material-icons">content_copy</i>
            </button>
          </FlexItem>
          <SizeContainer container={FlexItem} fluid>
            <Bristol ref="bristol"
                     style={{borderRight: "1px solid rgba(125, 125, 125, 0.5)"}}
                     renderRatio={3}
                     data={(post.source || [])[pageNumber]}
                     pen={this.state.pen}
                     palette={{SimplePen, Eraser}}
                     onChange={this.onChange}/>
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

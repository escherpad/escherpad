/** Created by ge on 4/18/16. */
import React from "react";
import ReactDOM from "react-dom";

import PostListView from "./PostListView";

export default class ListPanel extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  willReceiveProps(newProps) {
  }

  componentWillMount() {
    console.log(this.props);
    let store = this.props.store;
    store.subscribe((state)=> {
      let posts = Object.keys(state.posts).map((_)=>state.posts[_]).sort((a, b)=>(a[state.orderBy] - b[state.orderBy]));
      this.setState({posts, ...state.postList});
    });
  }

  render() {
    let posts = this.state ? this.state.posts : [];
    return (
      <div className="post-panel">
        <div className="control-bar">
          <div className="filters"></div>
          <div className="search-bar"></div>
          <div className="controls"></div>
        </div>
        <div className="hero">
          <button className="left"></button>
          <div className="center header">Notes</div>
          <button className="right"></button>
        </div>
        <div className="tab-control">
          <div className="tab">Team</div>
          <div className="tab">Just You</div>
          <div className="spacer"></div>
          <div className="control-item">recent</div>
        </div>
        <PostListView posts={posts}></PostListView>
      </div>
    )
  }
}

// <!--<PostListView posts={this.state.posts}></PostListView>-->


/*# Git Editor Development Note

## Todo List $\alpha and you can\mathrm{d}f$
2. [ ] show list of notes
3. [ ] make an account
2. [ ] collaboration with notes?
  3. [ ] connect note to GitHub [add backend to document]

## Issues
1. [ ] when the rendered text is longer than the markdown, for example when there are large images, scrolling to the bottom of the rendered view causes the editor scrollTop change event to trigger. A max scrollTop bound need to be set programatically.

### Done
1. [x] inlineEditable looses cursor when typing. **fixed by avoiding `dangerouslySetInnerHtml`**.
2. [x] When setting cursor from `MarkdownView`, if the vim cursor is not in insert mode, movement of the cursor creates a selection. **just add `clearSelection` after setting the cursor**
3. [x] add editor scroll on markdown scroll
4. [x] editor `onChange` and `onChangeCursor` events triggers `store` changes, leading `react-ace` component to `setValue`, which in turn sets the cursor to the end of the document.
5. [x] in markdonw list mode, pressing `enter` creates a new list item, but the cursor is placed at the begining of the new line.
6. [x] setting value in `AceEditor` takes the current cursor value from the `.editor` instance. This shouldn't be the case. It should always take the `cursorPosition` when it is defined, and the `this.editor.selection.getCursor()` value when the `cursorPosition` attribute is undefined.

when the `AceEditor` component is used without the `cursorPosition` attribute, the expected behavior is a bit fuzzy. Not sure what to expect precisely.
7. [x] setting editor cursor from the rendered markdown misses the target line by 1. This is caused by an extra `+1` in the PostView code. Fixed by removing the extra `+1`.*/

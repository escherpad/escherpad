/** Created by ge on 4/9/16. */

import demoPost from "./posts/demoPost";
import {editorInitialState} from "./editor";

export var demoInitialState = {
  editor: editorInitialState,
  posts: {}
};

demoInitialState.editor.post = demoPost.id;
demoInitialState.posts[demoPost.id] = demoPost;

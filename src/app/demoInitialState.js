/** Created by ge on 4/9/16. */

import {$uuid} from '../utils/$uuid';
export const demoPost = {
  id: $uuid(),
  title: "This is the title of the demo note",
  type: "text/markdown",
  source: "# Gittor, An Editor for GitHub"
};
export var demoInitialState = {
  editor: {},
  posts: {}
};

demoInitialState.editor.post = demoPost.id;
demoInitialState.posts[demoPost.id] = demoPost;

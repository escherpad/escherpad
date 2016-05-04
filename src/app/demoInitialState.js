/** Created by ge on 4/9/16. */

import demoPost from './demoPost';

export var demoInitialState = {
  editor: {},
  posts: {}
};

demoInitialState.editor.post = demoPost.id;
demoInitialState.posts[demoPost.id] = demoPost;

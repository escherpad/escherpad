/** Created by ge on 3/24/16. */
import {Store} from "luna";

import {session} from "../app/session";
import {editor} from "../editor-view/editor";
import {posts} from "../posts/posts";
import {demoInitialState} from "./demoInitialState";

const reducer = {
  session: session,
  editor: editor,
  posts: posts
};
export const GITTOR_STORE = '@@gittor-store';

import lz from "lz-string";
var cachedStore;
try {
  cachedStore = JSON.parse(lz.decompress(window.localStorage.getItem(GITTOR_STORE)));
} catch (e) {
}

let initialState = (window.__INITIAL_STATE__ || cachedStore || demoInitialState);

console.log(initialState);

export const rootStore = new Store(reducer, initialState);
rootStore.subscribe((state)=> {
  var serialized = JSON.stringify(state);
  var compressed = lz.compress(serialized);
  // console.log(`compression size reduction ${serialized.length} => ${compressed.length}`);
  window.localStorage.setItem(GITTOR_STORE, compressed);
});

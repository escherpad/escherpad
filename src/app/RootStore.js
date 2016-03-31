/** Created by ge on 3/24/16. */
import {preview} from "../article-view/preview";
import {Store} from "luna";

const reducer = {
  preview: preview
};
export const GITTOR_STORE = '@@gittor-store';

// 1. todo: load from localStorage
// 2. done: load from window
import lz from "lz-string";
var cachedStore;
try {
  cachedStore = JSON.parse(lz.decompress(window.localStorage.getItem(GITTOR_STORE)));
} catch (e) {}
console.log(cachedStore);
let initialState = (window.__INITIAL_STATE__ || cachedStore || {});

export const rootStore = new Store(reducer, initialState);
rootStore.subscribe((state)=>{

  var serialized = JSON.stringify(state);
  var compressed = lz.compress(serialized);
  console.log(`compression size reduction ${serialized.length} => ${compressed.length}`);
  window.localStorage.setItem(GITTOR_STORE, compressed);
});

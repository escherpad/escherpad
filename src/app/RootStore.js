/** Created by ge on 3/24/16. */
import {preview} from "../article-view/preview";
import {Store} from "luna";

const reducer = {
  preview: preview
};

// 1. todo: load from localStorage
// 2. done: load from window
const initialState = window.__INITIAL_STATE__;
export const rootStore = new Store(reducer, initialState);

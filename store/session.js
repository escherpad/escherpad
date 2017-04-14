/** Created by ge on 4/3/16. */
import {$uuid} from "../lib/$uuid";
const sessionInitialState = {
  agent: $uuid(),
  user: "Ge Yang",
  channel: "Escher-demo"
};

export function session(state = sessionInitialState, action) {
  return state;
}

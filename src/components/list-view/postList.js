/** Created by ge on 4/18/16. */
import {dropboxAccountKey} from "../../store/accounts/accounts";
export const ORDER_POSTS_BY = "ORDER_POSTS_BY";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
export const SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER";

export function postList(state = {orderBy: "modifiedAt", searchQuery: ""}, action) {
  if (action.type === ORDER_POSTS_BY) {
    return {...state, orderBy: action.orderBy};
  } else if (action.type === UPDATE_SEARCH_QUERY) {
    return {...state, searchQuery: action.query};
  } else if (action.type === SET_CURRENT_FOLDER) {
    return {...state, currentFolder: action.path, accountKey: dropboxAccountKey(action.account)};
  } else {
    return state;
  }
}

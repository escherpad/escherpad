/** Created by ge on 4/18/16. */
export const ORDER_POSTS_BY = "ORDER_POSTS_BY";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

export function postList(state = {orderBy: "modifiedAt", searchQuery: ""}, action) {
  if (action.type === ORDER_POSTS_BY) {
    return {...state, orderBy: action.orderBy};
  } else if (action.type === UPDATE_SEARCH_QUERY) {
    return {...state, searchQuery: action.query};
  } else {
    return state;
  }
}

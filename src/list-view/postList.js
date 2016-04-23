/** Created by ge on 4/18/16. */
export const ORDER_POST_BY = "ORDER_POST_BY";

export function postList(state = {orderBy: "createdAt"}, action) {
  if (action.type === ORDER_POST_BY) {
    return {...state, orderBy: action.field};
  }
  return state;
}
